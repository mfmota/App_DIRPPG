import { StyleSheet,View } from 'react-native';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const InputView = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(5),
    width:'80%',
    marginBottom: 12,
    borderRadius:40,
    backgroundColor:'#e8ebfa',  
    paddingBottom:'2%',
    paddingTop:'1%',
    alignSelf:'center',
  },
});
