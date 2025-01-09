import { StyleSheet } from "react-native";
import { fontFamily } from '@/styles/font-family';

export const styles = StyleSheet.create({

  txt:{
    fontFamily: fontFamily.bold,
    fontSize:12,
    alignSelf:'center'
  },
  data:{
    fontFamily: fontFamily.semiBold,
    fontSize:13,
    borderBottomWidth:1,
    borderColor:'#ddd',
    width:'38%',
    marginLeft:10
  },
  button:{
    marginTop:20,
    borderRadius:40,
    borderColor:'#ddd',
    borderWidth:2,
    width:'40%',
    padding:6,
    backgroundColor:'#66CCFF',
    alignSelf:'flex-end'
  },
  form: {
    marginTop: 16,
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 3,
    zIndex:999
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 6,
    marginBottom: 16,
    fontSize: 14,
    borderColor:'#ddd',
  },
  });