import { forwardRef } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';

type OptionProps = {
    title1?: string;
    title2?: string;
    style?: ViewStyle; 
  } & TouchableOpacityProps;

  export const TXTOptions = forwardRef <TouchableOpacity, OptionProps>(
    ({ title1,title2,style, ...touchableProps }, ref) => {
        return (
          <Pressable ref={ref} {...touchableProps} style={[styles.button,style]}>
            <Text style={styles.txtPergunta}>{title1}</Text>
            <Text style={styles.txtResposta}>{title2}</Text>
          </Pressable>
        );
      }

  );

  TXTOptions.displayName = 'Options';

  const styles = StyleSheet.create({
    button:{
       flexDirection:'row',
    },
    txtPergunta:{
        fontSize:10,
        justifyContent:'flex-start',
        marginLeft:'20%',
        fontFamily:'Montserrat-Regular'
    },

    txtResposta:{
        fontSize:10,
       justifyContent:'flex-end',
       textDecorationLine:'underline',
       fontFamily:'Montserrat-ExtraBold',
       marginLeft:2,
    },
});

export default TXTOptions;