import React, { useState,useEffect} from 'react';
import { View, SafeAreaView,Text, FlatList,TouchableOpacity} from 'react-native';
import { styles} from "@/app/styles";
import {IconTrash} from "@tabler/icons-react-native"
import { Header } from '@/components/header/header';
import { Background } from '@/components/Background';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import { Calendar,LocaleConfig } from 'react-native-calendars';
import { ptBR } from '@/utils/CalendarConfig';
import { useDays} from '@/context/daysContext';
import api from '@/utils/api';
import * as SecureStore from 'expo-secure-store';

LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = "pt-br"

export default function Calendario ()  {
    
    const { day,setDay } = useDays();    
    const [markedDays, setMarkedDays] = useState<{ [key: string]: any }>({});
    const [selectedMonth, setSelectedMonth] = useState<{ month: number; year: number }>({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });

    useEffect(()=>{
        
        const fetchEventos= async () =>{
            const id = await SecureStore.getItemAsync('id');
            try {
               const response =  await api.get('/eventos',{ params: { id: id } })
               const evento  = response.data
                if(evento.length > 0 ){
                    setDay((prevDays) => [
                        ...prevDays,
                        ...evento.map((ev: any) => ({
                            data: ev.data,
                            descricao: ev.descricao,
                            titulo: ev.titulo,
                            id: ev.id,
                        })),
                    ]);     
                }
               
            } catch (error) {
                console.log(error)
            }
        }
        fetchEventos();
    },[]);

    
    useEffect(() => {
        
        const newMarkedDays = day.reduce((acc, currentDay) => {
            const formattedDate = new Date(currentDay.data).toISOString().split('T')[0];
            acc[formattedDate] = { marked: true, dotColor: '#50cebb' };
            return acc;
        }, {} as { [key: string]: any });

        setMarkedDays(newMarkedDays);
    }, [day]);

    const filteredEvents = day.filter((event) => {
        const eventDate = new Date(event.data);
        return (
            eventDate.getMonth() + 1 === selectedMonth.month &&
            eventDate.getFullYear() === selectedMonth.year
        );
    });

    async function deleteEvent(id:number ) {
        if (!id) {
            console.error("ID inválido para exclusão.");
            return;
        }
        try {
            await api.delete("/eventos", {data:{id:id}});
            setDay((prevDays) => prevDays.filter((event) => event.id !== id));
        } catch (error) {
            if (error instanceof Error) {
                console.error("Erro ao excluir evento:", {
                    message: error.message,
                });
            }
        }
    }

    const renderEventItem = ({ item }: { item: { data: string; descricao: string; titulo: string,id:number } }) => (
        <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.titulo}</Text>
            <Text style={styles.eventDate}>{new Date(item.data).toLocaleDateString('pt-BR')}</Text>
            <Text style={styles.eventDescription}>{item.descricao || "Sem descrição"}</Text>
            <View style={{alignSelf:'flex-end'}}>
                <TouchableOpacity onPress={() => deleteEvent(item.id)}>
                    <IconTrash size={24} color="black"/>
                </TouchableOpacity>
            </View>
            
        </View>
    );

    return(
        <SafeAreaView>
            <Background>
                <Header/>
                <ContainerDrawer>
                    <View style={styles.containerCalendar}>
                        <Calendar 
                            styles = {styles.calendar}
                            theme={{
                                textMonthFontSize:18,
                                todayTextColor:'#1459ff',
                                selectedDayTextColor:'#1459ff',
                                textDisabledColor:'#717171'
                            }}
                            minDate={new Date().toDateString()}
                            markedDates={markedDays}
                            onMonthChange={(date: { year: number; month: number; day: number }) => {
                                setSelectedMonth({ month: date.month, year: date.year });
                            }}
                        />
                    </View>
                    <View style = {styles.listCalendar}>
                        <FlatList
                            data={filteredEvents}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderEventItem}
                            contentContainerStyle={styles.eventList}
                            ListEmptyComponent={() => (
                                <Text style={styles.noEventsText}>Nenhum evento salvo.</Text>
                            )}
                        />
                    </View>
                    
                </ContainerDrawer>

            </Background>
        </SafeAreaView>

    )
     
};

