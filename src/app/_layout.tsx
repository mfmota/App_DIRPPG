import { Stack } from "expo-router";

import {useFonts, Montserrat_800ExtraBold, Montserrat_600SemiBold, Montserrat_700Bold,Montserrat_400Regular } from "@expo-google-fonts/montserrat"
import { Loading } from "@/components/loading";

export default function Layout (){

    const [fontsLoaded] = useFonts({
        Montserrat_800ExtraBold, 
        Montserrat_600SemiBold, 
        Montserrat_700Bold,
        Montserrat_400Regular
    });

    if(!fontsLoaded){
        return <Loading/>
    }

    return <Stack
        screenOptions={{
            headerShown:false,
        }}
    />
};