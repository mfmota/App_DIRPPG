import React from 'react';
import {StyleSheet,View,ViewStyle} from 'react-native';
import Logo from "../../assets/images/logoDIRPPG.png";
import { Image, ImageStyle } from 'expo-image';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen'

interface FooterProps {
    style?: ImageStyle; // Prop opcional para receber estilos adicionais
  }

export const Footer : React.FC<FooterProps> = (props) =>  {
    const { style } = props;
    return(
        <View style={styles.boxLogo}>                    
            <Image source={Logo} style={[styles.logo,style]}></Image>
        </View>
    );
}

const styles = StyleSheet.create({
    boxLogo:{
        height:hp(20) ,
        width: '100%',
        position:'relative',
    },

    logo:{
        width:'55%',
        height:'55%',
        resizeMode:'contain',
        alignSelf:'center',
        marginTop:'5%'
    },

  });