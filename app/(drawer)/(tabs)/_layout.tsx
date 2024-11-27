import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function TabLayout() {
  return (
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
  );
}
