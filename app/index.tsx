import React, {useState} from 'react';
import {Text,View,TextInput,SafeAreaView, Pressable,Alert,TouchableOpacity} from 'react-native'
import{styles,useGlobalFonts } from "./styles"
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useRouter} from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { Background } from '~/components/Background';
import { InputView } from '~/components/InputView';
import { Footer } from '~/components/footer/footer';
import TXTOptions from '~/components/TXTOption'; 
import api from '../utils/api';
import * as SecureStore from 'expo-secure-store';

export default function Login(){

    const fontsLoaded = useGlobalFonts();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router= useRouter();
    const [loading, setLoading] = useState(false);
    const [showSenha, setShowSenha] = useState<boolean>(false);

    const toggleSenhaVisibility = () => setShowSenha((prev) => !prev);

    const userLogin = async () => {
        
        try {
            setLoading(true);
            
            const response = await api.post("/usuarios/login", {
                email: email,
                senha: senha,
            });

            const {token,usuario} = response.data
            
            await SecureStore.setItemAsync('token',token)
            await SecureStore.setItemAsync('id', usuario.id.toString());
            await SecureStore.setItemAsync('nome', usuario.nome);
            await SecureStore.setItemAsync('email', usuario.email);
                    
            router.push('../(tabs)/calendario');

        } catch (error) {
            Alert.alert('Email ou senha incorretos');
        } finally {
            setLoading(false);
        }
    }
            
    function cadastro(){
        router.replace('/cadastro');
    }    

    function redefinirSenha(){
        router.replace('/recuperarSenha');
    }

    if (!fontsLoaded) {
        return null; 
      }
    
    return(
        <SafeAreaView>
            <Background>
                    <Container>
                        <View style={[styles.boxTop,{ height:hp(20),}]}>
                            <Text style={styles.title} >DIRPPG-CT</Text>  
                            <Text style={styles.subTitle}>Diretoria de Pesquisa e Pós-Graduação</Text>             
                        </View>

                        <View style={[styles.boxMiddle,{height:hp(25)}]}>
                            <Text style={styles.txtLogin}>Login</Text>  
                            <InputView >
                                <MaterialIcons style={styles.iconInput}name="email" size={18} color="black" />
                                <TextInput 
                                style={styles.input}
                                placeholder=" | Email"
                                keyboardType='email-address'
                                autoComplete='email'
                                value={email}
                                onChangeText={setEmail}
                                />
                            </InputView>

                            <InputView>
                                <Fontisto style={styles.iconInput}name="locked" size={16} color="black" />
                                <TextInput style={styles.input}  
                                    placeholder=" | Senha"
                                    autoCapitalize='none'
                                    secureTextEntry={!showSenha}
                                    value={senha}
                                    onChangeText={setSenha}
                                />
                                <TouchableOpacity style={{alignSelf:'center'}} onPress={toggleSenhaVisibility}>
                                    <Feather style={styles.secondIcon} name={showSenha ? 'eye-off' : 'eye'}size={18} color="black"/>
                                </TouchableOpacity>
                            </InputView>

                            <Pressable onPress={redefinirSenha}>
                                <Text style={styles.txtSenha}>Esqueci minha senha</Text>
                            </Pressable>   

                        </View>

                        <View style={[styles.boxBottom,{height:hp(20)}]}>
                            <Button
                            title='Entrar'
                            onPress={userLogin}
                            />

                        <TXTOptions
                        title1='Não tem uma conta?'
                        title2='Cadastre-se'
                        onPress={cadastro}
                        />

                        </View>

                    <Footer/>
                    </Container>   
            </Background>
        </SafeAreaView>
        
    );

}