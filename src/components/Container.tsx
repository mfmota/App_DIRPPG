import { StyleSheet, View } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    height:hp(80),
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:20,
    marginTop:'20%',
    marginBottom:'12%',
    marginHorizontal:'12%',
    overflow:'hidden'
  },
});
