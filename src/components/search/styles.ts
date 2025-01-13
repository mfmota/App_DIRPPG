import { StyleSheet} from "react-native"
import { fontFamily } from '@/styles/font-family';

export const s = StyleSheet.create({    
    buscaContainer: {
        flexDirection: 'row',  
        marginTop:'3%',
        marginLeft:'8%',
        overflow:'hidden',
        justifyContent:'space-between'
    },

    inputViewAgenda:{
        flexDirection:'row',
        justifyContent:'space-between',
        height: '65%',
        width:'60%',
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
    boxTop:{
        justifyContent:'center',
        width:'97%',
    },
    iconAgenda:{
        marginRight:'5%',
        marginTop:'2%'
    },
    filter:{
        justifyContent:'center',
        marginTop:2
    },
    iconFilter:{
        marginRight:30,
    },
    modalContainer: {
        zIndex:999,
        alignSelf:'flex-end',
        height:'50%',
        width:'30%',
        marginTop:100,
        marginRight:30,
        borderRadius:40,

    },
    modalItem: {
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    close:{
        padding:3,
        borderRadius:5,
    },
    txt:{
        fontFamily:fontFamily.bold,
        fontSize:16
    } 

})