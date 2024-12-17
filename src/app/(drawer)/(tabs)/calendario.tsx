import React, { useState} from 'react';
import { Text, View, SafeAreaView} from 'react-native';
import { styles} from "@/app/styles";
import { Header } from '@/components/header/header';
import { Background } from '@/components/Background';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import { Calendar, DateData,LocaleConfig } from 'react-native-calendars';
import { ptBR } from '@/utils/CalendarConfig';

LocaleConfig.locales["pt-br"] = ptBR
LocaleConfig.defaultLocale = "pt-br"

export default function Calendario ()  {
    
    const [day,setDay] = useState<DateData>()
    
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
                            onDayPress={setDay}
                            markedDates={day &&{
                                [day.dateString]:{ selected:true }
                            }}
                        />
                    </View>
                </ContainerDrawer>

            </Background>
        </SafeAreaView>

    )
     
};

