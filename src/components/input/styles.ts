import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const s = StyleSheet.create({
    input:{
        flex: 1, 
        fontSize: 16,  

    },
    iconInput:{
        marginRight: 8,  
        marginLeft: 8,   
        color: '#333131',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between', 
        height: hp(5),
        width: '80%',
        marginBottom: 12,
        borderRadius: 40,
        backgroundColor: '#e8ebfa',
        alignSelf: 'center',
        paddingHorizontal: 8,
      },
})