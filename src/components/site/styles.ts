import { StyleSheet } from "react-native";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'

export const s = StyleSheet.create({
    container:{
        height:hp(80),
        backgroundColor:'white',
        borderRadius:20,
        marginTop:'15%',
        marginBottom:'12%',
        marginHorizontal:'6%',
        overflow:'hidden'
    }
})