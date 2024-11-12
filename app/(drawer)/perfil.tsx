import React, { useEffect } from 'react';
import {Text,View,SafeAreaView,TextInput} from 'react-native'
import{styles, useGlobalFonts} from "../styles"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useState} from "react";
import {Header} from '../../components/header/header'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Background } from '~/components/Background';
import { Button } from '~/components/Button';
import SelectNucleo from '~/components/SelectNucleo';
import { InputView } from '~/components/InputView';
import { ContainerDrawer } from '~/components/ContainerDrawer';
import * as SecureStore from 'expo-secure-store';

export default function perfil (){

    const fontsLoaded = useGlobalFonts();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const[senhaConf, setSenhaConf] = useState('');
    const [nucleosSelecionados, setNucleoSelecionados] = useState<any | null>([]);
    const [editais,setEditais] = useState<any | null>([]);

    useEffect( () =>{

        const carregarEditais = async () =>{
            
            const nucleos = await SecureStore.getItemAsync('nucleos');
            setNucleoSelecionados (nucleos);
            
            const editais =  await SecureStore.getItemAsync('editais');
            setEditais(editais);

        };
        carregarEditais();
    }, []);

    const atualizar = async () => {

        if(senha !== senhaConf){
            alert('As senhas precisam ser iguais');
            return;
        }

        try {
            const id = await SecureStore.getItemAsync('userId');
           
        } catch (error) {
            console.error(error);
        }
    };


    if (!fontsLoaded) {
        return null; 
      }

    return(
        <SafeAreaView>
            <Background>
               <Header/>
                <ContainerDrawer>
                    <View style={[styles.boxTop,{height:hp(13),paddingTop:'5%'}]}>
                        <Text style={[]}>Atualizar</Text> 
                    </View>

                    <View style={[styles.boxMiddle,{overflow:"visible",height:hp(35)}]}>
                       <InputView>
                            <Ionicons style={styles.iconInput}name="person" size={18} color="black" />
                            <TextInput style={styles.input} 
                            placeholder="| Nome"
                            value={nome}
                            onChangeText={setNome}
                            />
                        </InputView>
                        <InputView>
                            <MaterialIcons style={styles.iconInput}name="email" size={18} color="black" />
                            <TextInput style={styles.input} 
                            placeholder="| Email"
                            keyboardType='email-address'
                            autoComplete='email'
                            value={email}
                            onChangeText={setEmail}
                            />
                        </InputView>
                        <SelectNucleo onSelect={setNucleoSelecionados}/>           
                        <InputView>
                            <Fontisto style={styles.iconInput}name="locked" size={17} color="black" />
                            <TextInput style={styles.input} 
                            placeholder="| Senha"
                            secureTextEntry
                            value={senha}
                            onChangeText={setSenha}
                            />  
                        </InputView>
                        <InputView>
                            <Fontisto style={styles.iconInput}name="locked" size={17} color="black" />
                            <TextInput style={styles.input} 
                            placeholder="| Confirme a Senha"
                            secureTextEntry
                            value={senhaConf}
                            onChangeText={setSenhaConf}
                            />
                        </InputView>
                        <Button
                        title='Atualizar'
                        style={{width:'40%',height:'8%'}}
                        onPress={atualizar}
                        />

                    </View>                       
                </ContainerDrawer>
            </Background>
        </SafeAreaView>
    );


}