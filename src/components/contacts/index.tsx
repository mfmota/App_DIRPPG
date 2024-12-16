import {IconMailFilled,IconPhoneFilled,IconMapPinFilled} from "@tabler/icons-react-native"
import {Text, View,Linking,Platform } from 'react-native';
import {s} from "./styles"
import  {Info}  from "@/components/contact";

type ContactProps = {
    secretaria?:string;
    email?: string;
    tel?: string;
    local?:string;
  };

const openEmail = (email?:string) =>{
    const emailURL = `mailto:${email}`;
    Linking.openURL(emailURL).catch((err) =>
        console.error("Não foi possível abrir o aplicativo de e-mail:", err)
  );
}

const makePhoneCall = (tel?: string) =>{
    const phoneURL = Platform.OS === "android" ? `tel:${tel}` : `telprompt:${tel}`;
    Linking.openURL(phoneURL).catch((err) =>
    console.error("Não foi possível abrir o discador:", err)
  );
}
const openMaps = (local?:string) => {
    if (!local) {
        console.warn("Localização não fornecida.");
        return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local)}`;
    Linking.openURL(url).catch((err) =>
        console.error("Não foi possível abrir o mapa:", err)
    );
}


export function InfoView ({ secretaria,email,tel,local }:ContactProps ){

    return (
        <View style = {s.container}>
            <Text style={s.subTitle}>{secretaria}</Text>

            <Info onPress={() => openEmail(email)}>
                <Info.Icon icon = {IconMailFilled}/>
                <Info.Txt>{email}</Info.Txt>
            </Info>

            <Info onPress={()=> makePhoneCall(tel)}>
                <Info.Icon icon = {IconPhoneFilled}/>
                <Info.Txt>{tel}</Info.Txt>
            </Info>
            <Info onPress={() => openMaps(local)}>
                <Info.Icon icon = {IconMapPinFilled}/>
                <Info.Txt>{local}</Info.Txt>
            </Info>
        </View>
    )
}
