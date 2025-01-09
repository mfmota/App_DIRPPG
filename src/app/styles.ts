import { StyleSheet } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { fontFamily } from "@/styles/font-family";
SplashScreen.preventAutoHideAsync();

export const styles = StyleSheet.create({

    boxTop:{
        justifyContent:'center',
        width:'100%',
    },

    boxMiddle:{
        padding:'5%',
        justifyContent:'flex-start',
        width: '100%',
        height:hp(40),
    },
    boxBottom:{
        width: '100%',
        paddingHorizontal:30,
        marginTop:'5%',
        position:'relative',
    },


    title:{
        fontSize:40,
        alignSelf:'center',
        paddingBottom:5,
        fontFamily: fontFamily.extra_bold
    }, 

    subTitle:{
        alignSelf:'center',
        fontSize:12,
        fontFamily: fontFamily.semiBold

    },

    
    txtLogin:{
        fontSize:20,
        marginBottom:'10%',
        alignSelf:'center',
        fontFamily: fontFamily.extra_bold
     },
 
     txtSenha:{
         fontSize:12,
         textDecorationLine:'underline',
         alignSelf:'flex-end',
         marginRight:'12%',
         marginTop:3,
         paddingBottom:'5%',
         fontFamily:fontFamily.extra_bold
     },
 

     txt1:{
        fontFamily:fontFamily.extra_bold,
        fontSize:18,
        alignSelf:'center',
        marginBottom:'2%',
        marginTop:'15%'
     },

     txt2:{
        fontFamily:fontFamily.regular,
        fontSize:10,
        marginBottom:'10%',
        alignSelf:'center',
     },

    calendar:{
        backgroundColor:"transparent",
        padding:24
    },
    
    containerCalendar:{
        height:hp(10),
        width:'80%',
        borderRadius:40,
        alignContent:'center',
        alignSelf:'center',
        marginTop:15,
       
    },

    eventList: {
        padding: 16,
    },
    eventItem: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    eventDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    eventDescription: {
        fontSize: 14,
        color: '#444',
        marginTop: 8,
    },
    noEventsText: {
        textAlign: 'center',
        color: '#aaa',
        fontSize: 16,
        marginTop: 16,
    },
    listCalendar:{
        flex:1,
        marginTop:'80%'
    }
})