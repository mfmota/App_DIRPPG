import { StyleSheet } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { fontFamily } from "@/styles/font-family";
SplashScreen.preventAutoHideAsync();

export const styles = StyleSheet.create({

//-------------------------Geral-------------------------
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

//--------------------------------Index-----------------------------------
    
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
 
 //---------------------------------Redef Senha--------------------------------------------------------

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
 
//--------------------------------------AGENDA-----------------------------------------------------------------

    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop:10,
        padding:10,
    },

    filterText: {
        fontFamily:fontFamily.regular,
        fontSize: 12,
     },
     
     dropdownItem: {
         padding: 10,
         borderBottomWidth: 1,
         borderBottomColor: '#ddd',
     },
     dropdownItemLink: {
        padding: 10,
        
    },

    dropdownLink:{
        color:'blue',
        padding:10.,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    txtData:{
        fontFamily:fontFamily.semiBold,
        fontSize:10,
    },

    txtEvento:{
        fontFamily:fontFamily.bold,
        fontSize:12,
    },

    item: {
        padding:10,
        marginBottom:20,
        width:'90%',
        alignSelf:'center',
        alignContent:'center',
        borderRadius:10,
        borderColor:'#ddd',
        borderBottomWidth:2
    },

    list:{
        flexDirection:'row', 
        justifyContent:'space-between'
    },

//--------------------------------------PRAZOS------------------------------------------------------- 

    iconContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,  
    width: 22,         
    height: 22,
    overflow: 'hidden',
    marginLeft: 'auto', 
    },

    prazosTitle:{
        fontFamily:fontFamily.extra_bold,
        alignSelf:'center',
        textAlign:'center',
        width:'80%',
        fontSize:22,
    },



})