import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useFonts, Montserrat_800ExtraBold, Montserrat_600SemiBold, Montserrat_700Bold,Montserrat_400Regular } from "@expo-google-fonts/montserrat"
import { Loading } from "@/components/loading";
import { EditaisProvider } from "@/context/editaisContext"; 

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
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#1e39be',
          }}>
          <Tabs.Screen
            name="calendario"
            options={{
              title: 'Calendario',
              tabBarIcon: ({}) =>  <AntDesign name="calendar" size={24} color="black" />,
            }}
          />
          <Tabs.Screen
            name="prazos"
            options={{
              title: 'Prazos',
              tabBarIcon: ({}) =>  <AntDesign name="clockcircleo" size={24} color="black" />,
            }}
          />
        </Tabs>
      </EditaisProvider>
    </SafeAreaProvider>
  );
}
