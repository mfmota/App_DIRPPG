import { StyleSheet,ImageBackground } from 'react-native';
import Fundo from "@/assets/images/fundo.png"
export const Background = ({ children }: { children: React.ReactNode }) => {
    return <ImageBackground source={Fundo} style={styles.fundo}>{children}</ImageBackground>;
  };

  const styles = StyleSheet.create({
    fundo: {
       width:'100%',
        height: '100%'
    },
  });