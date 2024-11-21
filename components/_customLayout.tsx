import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import {Alert, View } from 'react-native';
import { signOut } from 'firebase/auth'; 
import { useRouter} from 'expo-router'; 
import{auth} from '../utils/firebase';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; 

export default function customLayout(props: any){
    
    const router = useRouter();
    const {top,bottom}= useSafeAreaInsets();
    
    const logout = async () => {
        try {
            await signOut(auth);  
            router.replace('/'); 
        } 
        catch (error) {
            console.log('Erro ao sair: ', error);
            Alert.alert('Erro', 'Falha ao fazer logout. Tente novamente.');
        }
    };

    const confirmLogout = () => {
        Alert.alert(
      "Confirmar Logout",
      "Desconectar",
      [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim", 
          onPress: () => logout()  
        }
      ],
      { cancelable: true }  
    );
  };

    return (
       
        <View style={{flex:1,paddingTop:30}}>
              <DrawerContentScrollView
             {...props} 
             scrollEnabled={false}
             contentContainerStyle={{paddingTop:top,paddingBottom:bottom}}>
                 <DrawerItemList
                 {...props}/>
                  </DrawerContentScrollView>
          <View style={{padding:20,paddingBottom:10+bottom}}>
           
                 <DrawerItem label={"Sair"} 
                 labelStyle={{marginLeft:-20}}
                 onPress={confirmLogout}
                 icon={({ color, size }) => (
                     <MaterialIcons name="logout" size={size} color={color} />
                 )}/>
                 
            
            </View>  
           
        </View>
    );
}