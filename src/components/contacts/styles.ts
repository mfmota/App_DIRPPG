import { StyleSheet } from "react-native";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { fontFamily } from '@/styles/font-family';

export const s = StyleSheet.create({

    container: {
          width:'80%',
          marginHorizontal: 12,
          marginVertical:10,
          alignSelf:'center',
          borderBottomWidth:2,
          borderColor:"#ddd",
          height:hp(20)
        },
        subTitle:{
          
          alignSelf:'center',
          fontSize:12,
          fontFamily: fontFamily.bold
      },
})