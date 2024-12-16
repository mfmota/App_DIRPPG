import {s} from "./styles"
import { Text, TouchableOpacity,TouchableOpacityProps,TextProps } from 'react-native';
import {IconProps as TablerIconProps} from "@tabler/icons-react-native"

type IconProps = {
    icon: React.ComponentType<TablerIconProps>
}

function Icon ({icon: Icon}: IconProps){
    return<Icon size={22}  color='black' />
}

function Txt({style,...rest}:TextProps ){
    return(
        <Text
        style={s.txt}
        {...rest}>
        </Text>
    )
}

function Info({children,...rest}:TouchableOpacityProps){
    return(
        <TouchableOpacity style={s.boxInfo} {...rest}>
            {children}
        </TouchableOpacity>
    )
}

Info.Txt = Txt
Info.Icon = Icon

export {Info}