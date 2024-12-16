import {StyleSheet} from "react-native"
import { fontFamily } from '@/styles/font-family';

export const s = StyleSheet.create({

    container: {
        alignItems:'center',
        alignSelf:'center',
        justifyContent: 'center',
        borderRadius: 40,
        backgroundColor: '#1e39be',
        height:40,
        paddingBottom:'1%',
        width:100,
        marginTop:'8%',
        marginBottom:'10%'
      },
      title: {
        color: 'white',
        alignSelf:'center',
        fontFamily:fontFamily.extra_bold,
        fontSize:13
      },

})