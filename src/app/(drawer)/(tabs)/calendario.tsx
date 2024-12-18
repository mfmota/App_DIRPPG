import React, { useState,useEffect} from 'react';
import { View, SafeAreaView,Alert} from 'react-native';
import { styles} from "@/app/styles";
import { Header } from '@/components/header/header';
import { Background } from '@/components/Background';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import { Calendar,LocaleConfig } from 'react-native-calendars';
import { ptBR } from '@/utils/CalendarConfig';
import * as CalendarAPI from 'expo-calendar';
import { useDays } from '@/context/daysContext';

LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = "pt-br"

export default function Calendario ()  {
 
    const { day,setDay } = useDays();    

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
                            markedDates={day}
                        />
                    </View>
                </ContainerDrawer>

            </Background>
        </SafeAreaView>

    )
     
};

