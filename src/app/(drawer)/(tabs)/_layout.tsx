import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useFonts, Montserrat_800ExtraBold, Montserrat_600SemiBold, Montserrat_700Bold,Montserrat_400Regular } from "@expo-google-fonts/montserrat"
import { Loading } from "@/components/loading";
import { EditaisProvider } from "@/context/editaisContext"; 
import { DaysProvider } from '@/context/daysContext';

export default function TabLayout() {

  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold, 
    Montserrat_600SemiBold, 
    Montserrat_700Bold,
    Montserrat_400Regular
  });

  if(!fontsLoaded){
      return <Loading/>
  }
  return (
    <SafeAreaProvider>
      <EditaisProvider>
        <DaysProvider>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: '#1e39be',
            }}>
            <Tabs.Screen
              name="editais"
              options={{
                title: 'Editais',
                tabBarIcon: ({}) =>  <AntDesign name="filetext1" size={24} color="black"/>,
              }}
            />
            <Tabs.Screen
              name="calendario"
              options={{
                title: 'Calendário',
                tabBarIcon: ({}) =>  <AntDesign name="calendar" size={24} color="black" />,
              }}
            />
          </Tabs>
        </DaysProvider>
      </EditaisProvider>
    </SafeAreaProvider>
  );
}
