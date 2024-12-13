import { forwardRef } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { fontFamily } from '@/styles/font-family';
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
        fontSize:12,
        justifyContent:'flex-start',
        marginLeft:'15%',
        fontFamily:fontFamily.regular
    },

    txtResposta:{
        fontSize:12,
       justifyContent:'flex-end',
       textDecorationLine:'underline',
       fontFamily:fontFamily.extra_bold,
       marginLeft:2,
    },
});

export default TXTOptions;