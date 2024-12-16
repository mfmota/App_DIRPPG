import {View,Text,TouchableOpacity} from "react-native"
import { Input } from "@/components/input";
import React, {useState} from 'react';
import {IconUser,IconMail, IconLock} from "@tabler/icons-react-native"
import {s} from "./styles"
import Feather from '@expo/vector-icons/Feather';

type InputLoginProps = {
    nome:string;
    email: string;
    senha: string;
    senhaConf:string;
    setNome: (value: string) => void;
    setEmail: (value: string) => void;
    setSenha: (value: string) => void;
    setSenhaConf: (value: string) => void;
};

export function InputCadastro({ nome, email, senha, senhaConf,setNome, setEmail, setSenha, setSenhaConf }: InputLoginProps){

     const [showSenha, setShowSenha] = useState<boolean>(false);
      const [showSenhaConf, setShowSenhaConf] = useState<boolean>(false);
    
     const toggleSenhaVisibility = () => setShowSenha((prev) => !prev);
     const toggleSenhaConfVisibility = () => setShowSenhaConf((prev) => !prev);
    return (
        <View>
            <Input>
                <Input.Icon icon = {IconUser}/>
                    <Input.Title
                        placeholder=" | Nome"
                        value={nome}
                        onChangeText={setNome}
                    ></Input.Title>
                                            
            </Input>
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
            <Input>
                <Input.Icon icon = {IconLock}/>
                <Input.Title
                placeholder=" | Confirme a senha"
                autoCapitalize='none'
                secureTextEntry={!showSenhaConf}
                value={senhaConf}
                onChangeText={setSenhaConf}
                >
                </Input.Title>
                <TouchableOpacity style={{alignSelf:'center'}} onPress={toggleSenhaConfVisibility}>
                    <Feather style={s.secondIcon} name={showSenhaConf ? 'eye-off' : 'eye'}size={18} color="black"/>
                </TouchableOpacity>
            </Input>
        </View>
    )
}