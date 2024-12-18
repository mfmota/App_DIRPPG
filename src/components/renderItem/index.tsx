import {View,TouchableOpacity,Text,Linking,Alert,Platform} from "react-native"
import {s} from "./styles"
import * as Calendar from 'expo-calendar';
import {IconChevronDown} from "@tabler/icons-react-native"
import {Edital} from '@/context/editaisContext';
import { useEffect } from "react";
import { useDays,Day } from "@/context/daysContext";

type Props = {
    item:Edital,
    expanded: boolean;
    onToggleExpand: () => void;
}

export function Iten({item,expanded,onToggleExpand}:Props){

  const { day,setDay } = useDays();

  useEffect(() => {
    (async () => {
      const permissionGranted = await getCalendarPermissions();
      if (!permissionGranted) {
         Alert.alert('Erro', 'Permissões não concedidas');
      }
    })();
  }, []);
    
  async function handleAddEvent(title: string, description: string, date: string) {
    try {
        const calendarId = await createNewCalendar();
        const startDate = new Date(date); 
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); 
        const eventId = await addEventToCalendar(calendarId);
        const dados = {date,description,title}
        //setDay(dados)
            

          Alert.alert('Evento criado!', `Evento "${title}" adicionado ao calendário.`);
    } catch (error) {
          Alert.alert('Erro', "Erro ao criar o evento");
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
                          <TouchableOpacity key={index} onPress={() => handleAddEvent(item.titulo, prazo.descricao, prazo.data)}>
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
      
  async function addEventToCalendar(calendarId: string) {
    const eventId = await Calendar.createEventAsync(calendarId, {
      title: 'Reunião de Projeto',
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 60 * 1000),
        timeZone: 'America/Sao_Paulo',
        location: 'Online',
    });
      
    return eventId;
  }

}

