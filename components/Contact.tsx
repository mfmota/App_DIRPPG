import { forwardRef } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Pressable, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle,Linking,Platform } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import{useGlobalFonts} from '../app/styles'

type OptionProps = {
    email?: string;
    tel?: string;
    local?:string
  };

  const openEmail = () =>{
    Linking.openURL("mailto: dirppgapp@gmail.com");
}

const makePhoneCall = () =>{
    if(Platform.OS === "android")
        Linking.openURL("tel: 41 33104676");
    else
    Linking.openURL("telprompt: 41 33104676");
}
const openMaps = () => {
    const address = "Av. Sete de Setembro, 3.165, Curitiba, PR";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
}

const Contact:  React.FC <OptionProps> = ({ 
    email,
    tel,
    local= false,
}) => {
        return( 
            <View style={styles.container}>
                <View style={styles.boxInfoDuvidas}>
                    <Pressable style={{marginRight:20}}
                        onPress={openEmail}>
                        <MaterialIcons name="email" size={24} color="black" />
                    </Pressable>
            
                    <Text style={styles.txtContato}>dirppg-ct@utfpr.edu.br </Text>  
                </View>

                <View style={styles.boxInfoDuvidas}>
                    <Pressable style={{marginRight:20}}
                    onPress={makePhoneCall}>
                        <Foundation name="telephone" size={24} color="black" />
                    </Pressable>
                 <Text style={styles.txtContato}>(41) 3310-4545 </Text>
                </View>

                <View style={styles.boxInfoDuvidas}>
                    <Pressable style={{marginRight:20}}  onPress={openMaps}>
                        <MaterialIcons name="place" size={24} color="black" />
                    </Pressable>  
                        
                    <Text style={[styles.txtContato,{width:'80%'}]}>
                        Av. Sete de Setembro, 3.165 – Curitiba PR. Sala: CJ – 007
                        Andar térreo.
                    </Text>
                </View>
            </View>
        );
    };  

  const styles = StyleSheet.create({
    container: {
      height: hp(15),
      width:'80%',
      marginBottom: 12,
      borderRadius:40,
      backgroundColor:'#e8ebfa',  
      paddingBottom:'2%',
      paddingTop:'1%',
      alignSelf:'center',
    },

    boxDuvidas:{
        height:'70%', 
        padding: 20,
        marginVertical: 20,
        alignItems: 'flex-start', 
        width: '80%'
    },

    boxInfoDuvidas:{
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:35
    },

    txtContato:{
        fontFamily:'Montserrat-SemiBold'
        
    },   
});

export default Contact;