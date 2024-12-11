import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StyleSheet, Text, TouchableOpacity, View,Linking,Platform } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import{useGlobalFonts} from '../src/app/styles'


type ContactProps = {
    secretaria?:string;
    email?: string;
    tel?: string;
    local?:string;
  };

  const openEmail = (email?:string) =>{
    const emailURL = `mailto:${email}`;
    Linking.openURL(emailURL).catch((err) =>
        console.error("Não foi possível abrir o aplicativo de e-mail:", err)
  );
}

const makePhoneCall = (tel?: string) =>{
    const phoneURL = Platform.OS === "android" ? `tel:${tel}` : `telprompt:${tel}`;
    Linking.openURL(phoneURL).catch((err) =>
    console.error("Não foi possível abrir o discador:", err)
  );
}
const openMaps = (local?:string) => {
    if (!local) {
        console.warn("Localização não fornecida.");
        return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local)}`;
    Linking.openURL(url).catch((err) =>
        console.error("Não foi possível abrir o mapa:", err)
    );
}

const Contact:  React.FC <ContactProps> = ({ 
    secretaria,
    email,
    tel,
    local,
}) => {
    const fontsLoaded = useGlobalFonts();

    if (!fontsLoaded) {
        return null; 
    }
        return( 

            <View style={styles.container}>
                <Text style={styles.subTitle}>{secretaria}</Text>

                <TouchableOpacity style={styles.boxInfoDuvidas} onPress={() => openEmail(email)}>
                    <MaterialIcons style={styles.icon} name="email" size={24} color="black" />
                    <Text style={styles.txtContato}>{email}</Text> 
                </TouchableOpacity>

                <TouchableOpacity style={styles.boxInfoDuvidas} onPress={() => makePhoneCall(tel)}>
                    <Foundation  style={styles.icon}  name="telephone" size={24} color="black" />
                    <Text style={styles.txtContato}>{tel}</Text>
                 </TouchableOpacity>

                <TouchableOpacity style={styles.boxInfoDuvidas} onPress={() => openMaps(local)}>
                    <MaterialIcons style={styles.icon} name="place" size={24} color="black" />
                    <Text style={styles.txtContato}>{local}</Text>
                </TouchableOpacity>

            </View>
        );
    };  

  const styles = StyleSheet.create({
    container: {
      width:'80%',
      paddingTop: 12,
      alignSelf:'center',
      borderBottomWidth:2,
      borderColor:"#ddd",
      height:hp(20)
    },
    boxInfoDuvidas:{
        marginTop:'3%',
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:2,
    },

    txtContato:{
        fontFamily:'Montserrat-SemiBold',
        width:'80%',
    },   
    subTitle:{
        alignSelf:'center',
        fontSize:12,
        fontFamily: 'Montserrat-Bold'
    },
    icon:{
        marginRight:20
    }
});

export default Contact;