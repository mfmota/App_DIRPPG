import { StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'

SplashScreen.preventAutoHideAsync();

export function useGlobalFonts() {
    const [fontsLoaded, error] = useFonts({
      'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
      'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
      'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    });
  
    useEffect(() => {
        async function prepare() {
            if (error) {
                console.error('Erro ao carregar fontes', error);
                await SplashScreen.hideAsync();
            } else if (fontsLoaded) {
                await SplashScreen.hideAsync();
            }
        }
        prepare();
    }, [fontsLoaded, error]);
  
    return fontsLoaded;
  }

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
        fontFamily: 'Montserrat-ExtraBold'
    }, 

    subTitle:{
        alignSelf:'center',
        fontSize:12,
        fontFamily: 'Montserrat-SemiBold'
    },

    input:{
        marginLeft:'2%',
        width:'70%'
    },

    iconInput:{
        alignSelf:'center',
        marginLeft:'6%'
    },

    secondIcon:{
        alignSelf:'center',
        marginRight:'10%',
    },

//--------------------------------Index-----------------------------------
    
    txtLogin:{
        fontSize:20,
        marginBottom:'10%',
        alignSelf:'center',
        fontFamily: 'Montserrat-ExtraBold'
     },
 
     txtSenha:{
         fontSize:10,
         textDecorationLine:'underline',
         alignSelf:'flex-end',
         marginRight:'12%',
         paddingBottom:'5%',
         fontFamily:'Montserrat-ExtraBold'
     },
 
 //---------------------------------Redef Senha--------------------------------------------------------

     txt1:{
        fontFamily:'Montserrat-ExtraBold',
        fontSize:18,
        alignSelf:'center',
        marginBottom:'2%',
        marginTop:'15%'
     },

     txt2:{
        fontFamily:'Montserrat-Regular',
        fontSize:10,
        marginBottom:'10%',
        alignSelf:'center',
     },
 
//--------------------------------------AGENDA-----------------------------------------------------------------

    buscaContainer: {
        flexDirection: 'row',  
        marginTop:'3%',
        marginLeft:'10%',
        overflow:'hidden'
    },

    inputViewAgenda:{
        flexDirection:'row',
        justifyContent:'space-between',
        height: '65%',
        width:'75%',
        borderRadius:20,
        backgroundColor:'#e8ebfa',  
        marginLeft:'5%',
        paddingBottom:'2%',
        marginTop:'3%'
    },

    inputAgenda:{
       marginTop:'3%',
       marginLeft:'4%',
    },

    iconAgenda:{
        marginRight:'5%',
        marginTop:'2%'
    },

    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop:10,
        padding:10,
    },

    filterText: {
        fontFamily:'Montserrat-Regular',
         fontSize: 12,
     },
     
     dropdownItem: {
         padding: 10,
         borderBottomWidth: 1,
         borderBottomColor: '#ddd',
     },

    txtData:{
        fontFamily:'Montserrat-SemiBold',
        fontSize:10,
    },

    txtEvento:{
        fontFamily:'Montserrat-Bold',
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
        fontFamily:'Montserrat-ExtraBold',
        alignSelf:'center',
        textAlign:'center',
        width:'80%',
        fontSize:22,
    },

//--------------------------------SITE---------------------------------------------
    site:{
        height:hp(80),
        backgroundColor:'white',
        borderRadius:20,
        marginTop:'15%',
        marginBottom:'12%',
        marginHorizontal:'6%',
        overflow:'hidden'
    },    


})