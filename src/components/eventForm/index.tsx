import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Calendar from 'expo-calendar';
import * as SecureStore from 'expo-secure-store';
import api from '@/utils/api';
import { styles } from './styles';
import { useDays} from "@/context/daysContext";

export default function EventForm () {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const {day, setDay } = useDays();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentEvent, setCurrentEvent] = useState<{ title: string, description: string } | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showForm, setShowForm] = useState(false);

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

            try{
            console.log(description)
            const response = await api.post('/eventos',{id_usuario:id,titulo:title,descricao:description,data:normalizedDate})

            const eventoCriado = response.data
            console.log(eventoCriado)
            
            setDay((prevDays) => [
                ...prevDays,
                {  data: normalizedDate.toISOString(), descricao: description, titulo: title, id:eventoCriado.id },
            ]);
            
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
        setShowForm(false)
        setTitulo('')
        setDescricao('')
        }
    }

  return (
     <View>
        <TouchableOpacity style={styles.button} onPress={() => setShowForm(true)}>
            <Text style={styles.txt}>Adicionar evento</Text>
        </TouchableOpacity>
        {showForm &&(

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Título"
                    value={titulo}
                    onChangeText={setTitulo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    value={descricao}
                    onChangeText={setDescricao}
                />
                <TouchableOpacity onPress={() => {
                    setCurrentEvent({ title: titulo, description: descricao });
                    setShowDatePicker(true)}}>
                    <Text style={styles.data}>Escolher Data</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            if (event.type ==="set" && date) {
                                handleDateConfirm(date);
                                setShowDatePicker(false); 
                            } else {
                                setShowDatePicker(false); 
                            }
                        }}
                    />
                )}
                <TouchableOpacity style={[styles.button,{alignSelf:'center'}]} onPress={() => setShowForm(false)}>
                    <Text style={styles.txt}>Fechar</Text>
                </TouchableOpacity>
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
        type: 'LOCAL',
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

};