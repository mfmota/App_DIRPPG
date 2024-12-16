import { StyleSheet } from "react-native";
import { fontFamily } from '@/styles/font-family';

export const s = StyleSheet.create({

        boxInfo:{
            marginTop:'6%',
            flexDirection:'row',
            alignItems:'center',
            gap:10,
            width:'80%'
        },
        txt:{
            fontFamily:fontFamily.semiBold,
            flexWrap:'wrap',
            lineHeight:20
        },  
})