import { Stack } from "expo-router";
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts,Montserrat_800ExtraBold, Montserrat_600SemiBold, Montserrat_700Bold,Montserrat_400Regular } from "@expo-google-fonts/montserrat"
import { Loading } from "@/components/loading";
import * as SplashScreen from 'expo-splash-screen';

export default function Layout (){
    const [fontsLoaded] = useFonts({
        Montserrat_800ExtraBold, 
        Montserrat_600SemiBold, 
        Montserrat_700Bold,
        Montserrat_400Regular
    });

    useEffect(() => {
        if (fontsLoaded) {
          SplashScreen.hideAsync(); 
        }
      }, [fontsLoaded])
    
    if(!fontsLoaded){
        return <Loading/>
    }

    console.log('Fonts Loaded:', fontsLoaded);

    return (
        <SafeAreaProvider>
            <Stack
                initialRouteName="index"
                screenOptions={{
                    headerShown:false,
                }}
            />
        </SafeAreaProvider>
    )
    
};