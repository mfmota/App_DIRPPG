import {MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import customLayout from '@/components/_customLayout';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import 'react-native-gesture-handler';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {useFonts, Montserrat_800ExtraBold, Montserrat_600SemiBold, Montserrat_700Bold,Montserrat_400Regular } from "@expo-google-fonts/montserrat"
import { Loading } from "@/components/loading";
export default function DrawerLayout (){
  
  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold, 
    Montserrat_600SemiBold, 
    Montserrat_700Bold,
    Montserrat_400Regular
  });

  if(!fontsLoaded){
    return <Loading/>
  }

  return(
    <Drawer drawerContent={customLayout} 
    screenOptions={{headerShown:false, 
    drawerHideStatusBarOnOpen:true,
    drawerLabelStyle:{marginLeft:-20}}}>

    
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel:'Calendário',
          drawerLabelStyle:{fontFamily:'Montserrat_600SemiBold'},
          drawerIcon: ({}) => (
            <AntDesign name="calendar" size={24} color="black" />
          ),
        }}
      />

      <Drawer.Screen
        name="site"
        options={{
          drawerLabel:'Site',
          drawerLabelStyle:{fontFamily:'Montserrat_600SemiBold'},
          drawerIcon: ({}) => (
            <AntDesign name="earth" size={24} color="black" />
          ),
        }}
      />

      <Drawer.Screen
        name="contato"
        options={{
          title: 'Contato',
          drawerLabel:'Contato',
          drawerLabelStyle:{fontFamily:'Montserrat_600SemiBold'},
          drawerIcon: ({}) => (
            <MaterialIcons name="support-agent" size={24} color="black" />
          ),
        }}
      />

      <Drawer.Screen
        name="perfil"
        options={{
          title: 'perfil',
          drawerLabel:'Perfil',
          drawerLabelStyle:{fontFamily:'Montserrat_600SemiBold'},
          drawerIcon: ({}) => (
            <FontAwesome5 name="user-edit" size={24} color="black" />
          ),
        }}
    />
    </Drawer>
  );
};


