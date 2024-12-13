import {View,Text,TouchableOpacity} from "react-native"
import { Input } from "@/components/input";
import React, {useState} from 'react';
import {IconMail, IconLock} from "@tabler/icons-react-native"
import {s} from "./styles"
import Feather from '@expo/vector-icons/Feather';

type InputLoginProps = {
    email: string;
    senha: string;
    setEmail: (value: string) => void;
    setSenha: (value: string) => void;
};

export function InputLogin({ email, senha, setEmail, setSenha }: InputLoginProps){

     const [showSenha, setShowSenha] = useState<boolean>(false);
    
    const toggleSenhaVisibility = () => setShowSenha((prev) => !prev);
    return (
        <View>
            <Input>
                <Input.Icon icon = {IconMail}/>
                    <Input.Title
                        placeholder=" | Email"
                        keyboardType='email-address'
                        autoComplete='email'
                        value={email}
                        onChangeText={setEmail}
                    ></Input.Title>
                                            
            </Input>
            <Input>
                <Input.Icon icon = {IconLock}/>
                <Input.Title
                placeholder=" | Senha"
                autoCapitalize='none'
                secureTextEntry={!showSenha}
                value={senha}
                onChangeText={setSenha}
                >
                </Input.Title>
                <TouchableOpacity style={{alignSelf:'center'}} onPress={toggleSenhaVisibility}>
                    <Feather style={s.secondIcon} name={showSenha ? 'eye-off' : 'eye'}size={18} color="black"/>
                </TouchableOpacity>
            </Input>
        </View>
    )
}