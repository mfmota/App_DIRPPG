
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const s = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 12,
  },
  dropdownHeader: {
    width: '100%',
    borderRadius: 40,
    backgroundColor: '#e8ebfa',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    color: '#a1a1a1',

  },
  dropdownList: {
    position: 'absolute',
    top: '90%',
    width: '100%',
    maxHeight:hp(35),
    backgroundColor: '#e8ebfa',
    borderRadius: 20,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  dropdownItem: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  selectedItem: {
    backgroundColor: '#c8d4ff',
  },
  itemText: {
    fontSize: 14,
    color: '#000',
  },
  icon:{
    marginRight: 5,  
    marginLeft: 8,   
    color: '#333131',
},
});
