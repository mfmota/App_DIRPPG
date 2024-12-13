import {View,TextInput,TextInputProps} from "react-native"
import {s} from "./styles"
import {IconProps as TablerIconProps} from "@tabler/icons-react-native"
import React from "react";


function Input ({ children }: { children: React.ReactNode }){

    return (
        <View style = {s.container}>{children}</View>
    )
}

function Title({style,placeholder,...rest}:TextInputProps ){
    return(
        <TextInput
        style={s.input}
        placeholder={placeholder}
        {...rest}>
        </TextInput>
    )
}

type IconProps = {
    icon: React.ComponentType<TablerIconProps>
}

function Icon ({icon: Icon}: IconProps){
    return<Icon size={22} style ={s.iconInput} />
}

Input.Title = Title
Input.Icon = Icon

export {Input}