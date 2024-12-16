import { StyleSheet } from "react-native" 
import { fontFamily } from "@/styles/font-family";

export const s = StyleSheet.create({
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

})