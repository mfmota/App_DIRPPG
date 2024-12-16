import { StyleSheet } from "react-native";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { bottom } = useSafeAreaInsets();

export const s = StyleSheet.create({

    boxMiddle:{
            padding:'5%',
            justifyContent:'flex-start',
            width: '100%',
            height: '100%',
            paddingBottom:bottom
        },
})