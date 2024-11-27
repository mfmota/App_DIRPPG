import React from 'react';
import {StyleSheet,View} from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';
import Logo from "./assets/images/logoDIRPPG.png";
import { Image } from 'expo-image'

export const Header = () =>{

    return (
        <View style={styles.view}>

        <DrawerToggleButton/>
        <Image
        source={Logo}
        style={styles.logo}
        />
        </View>
    )

}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height:'8%',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        paddingTop:10
    },
    logo: {
        width:'75%',
        height:'75%',
        resizeMode:'contain',
        alignSelf:'center'
    },
  });