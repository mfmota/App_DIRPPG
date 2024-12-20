import {View,TouchableOpacity,Text,Linking,Alert,Platform} from "react-native"
import {s} from "./styles"
import * as Calendar from 'expo-calendar';
import {IconChevronDown} from "@tabler/icons-react-native"
import {Edital} from '@/context/editaisContext';
import { useEffect, useState } from "react";
import { useDays} from "@/context/daysContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '@/utils/api';
import * as SecureStore from 'expo-secure-store';

type Props = {
    item:Edital,
    expanded: boolean;
    onToggleExpand: () => void;
}

export function Iten({item,expanded,onToggleExpand}:Props){

  const {day, setDay } = useDays();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentEvent, setCurrentEvent] = useState<{ title: string, description: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      const permissionGranted = await getCalendarPermissions();
      if (!permissionGranted) {
         Alert.alert('Erro', 'Permissões não concedidas');
      }
    })();
  }, []);
  
  
  async function handleDateConfirm(date: Date) {
    if (isProcessing) return; 
    setIsProcessing(true);
   
    try {
        if (!currentEvent) return;

        const id = await SecureStore.getItemAsync('id');
        const { title, description } = currentEvent;

        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);

        const calendarId = await createNewCalendar();
        const startDate = date;
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

        await Calendar.createEventAsync(calendarId, {
            title,
            startDate,
            endDate,
            timeZone: 'America/Sao_Paulo',
            location: 'Local padrão',
            notes: description,
        });

        setDay((prevDays) => [
            ...prevDays,
            {  data: normalizedDate.toISOString(), descricao: description, titulo: title },
        ]);

        try{
          await api.post('/eventos',{id_usuario:id,titulo:title,decricao:description,data:normalizedDate})
          
        }catch(error){
          console.error('Erro ao salvar evento no banco',error);
        }

        Alert.alert('Evento criado!', `Evento "${title}" foi adicionado ao calendário e salvo no contexto.`);
    } catch (error) {
        Alert.alert('Erro', 'Erro ao criar o evento');
    } finally {
      setIsProcessing(false);
      setShowDatePicker(false);
      setCurrentEvent(null);
  }
}


  return (
      <View style={s.item}>
          <TouchableOpacity style={s.list} onPress={onToggleExpand}>  
              <View style={{ flexDirection: 'column', width: '90%' }}>
                  <Text style={s.txtEvento}>{item.titulo}</Text>
              </View>
              <IconChevronDown style={{ justifyContent: 'flex-end' }} size={18} color="black" />
          </TouchableOpacity>
            
          {expanded && (
              <View style={s.dropdown}>
                  <Text style={s.dropdownItem}>Núcleo: {item.nucleo}</Text>
                  <Text style={s.dropdownItem}>Descrição: {item.descricao}</Text>
                  <TouchableOpacity onPress={() => Linking.openURL(item.link1)}>
                      <Text style={s.dropdownItemLink}>Página do Edital: </Text>
                      <Text style={s.dropdownLink}>{item.link1}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL(item.link2)}>
                      <Text style={s.dropdownItemLink}>Edital:</Text>
                      <Text style={s.dropdownLink}>{item.link2}</Text>
                  </TouchableOpacity>
                                    
                  <Text style={s.dropdownItem}>Cronograma:</Text>
                  {item.prazos[0] != null ? (
                      item.prazos.map((prazo, index) => (
                          <TouchableOpacity key={index} onPress={() => {
                            setCurrentEvent({ title: item.titulo, description: prazo.descricao }); // Define o evento atual
                            setShowDatePicker(true);
                          }}
                          >
                                  <Text key={index} style={s.dropdownItem}>
                                      {prazo.descricao}: {prazo.data}
                                  </Text>
                          </TouchableOpacity>
                           
                      ))
                  ) : (
                      <Text style={s.dropdownItem}>Cronograma não encontrado</Text>
                  )}
              </View>
          )}

            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                        if (date) {
                            setShowDatePicker(false);
                            handleDateConfirm(date);
                        } else {
                            setShowDatePicker(false); // Fechar se o usuário cancelar
                        }
                    }}
                />
            )}
      </View>
  )

  async function getCalendarPermissions() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    return status === 'granted';
  }
      
  async function createNewCalendar() {
    let defaultCalendarSource;
      
    if (Platform.OS === 'ios') {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      defaultCalendarSource = defaultCalendar.source;
    } else {
      defaultCalendarSource = { 
          isLocalAccount: true, 
          name: 'Expo Calendar', 
          type: 'LOCAL' 
        };
    }
      
    const newCalendarID = await Calendar.createCalendarAsync({
        title: 'Meu Calendário Expo',
        color: '#2196F3',
        entityType: Calendar.EntityTypes.EVENT,
        source: defaultCalendarSource,
        name: 'ExpoCalendar',
        ownerAccount: 'personal',
        accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
      
      return newCalendarID;
  }
      
}

