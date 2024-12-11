import { StyleSheet, View, ViewStyle } from 'react-native';

interface ContainerDrawerProps {
    children: React.ReactNode;
    style?: ViewStyle; // Permite passar estilos adicionais
  }

  export const ContainerDrawer = ({ children, style }: ContainerDrawerProps) => {
    return <View style={[styles.container, style]}>{children}</View>; // Combina os estilos
  };

const styles = StyleSheet.create({
    container:{
        height:'90%',
        marginTop:'5%',
        marginHorizontal:'5%',
        borderRadius:20,
        backgroundColor:'white',
    },
});
