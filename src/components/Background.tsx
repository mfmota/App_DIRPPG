import { StyleSheet, SafeAreaView, View,ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Fundo from "../assets/images/fundo.png"
export const Background = ({ children }: { children: React.ReactNode }) => {
    return <ImageBackground source={Fundo} style={styles.fundo}>{children}</ImageBackground>;
  };


  const styles = StyleSheet.create({
    fundo: {
       width:'100%',
        height: '100%'
    },
  });