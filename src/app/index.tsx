import React, {useState} from 'react';
import {Text,View,SafeAreaView, Pressable,Alert} from 'react-native'
import{styles} from "./styles"
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useRouter} from 'expo-router'
import { Button } from '@/components/button';
import { Container } from '@/components/Container';
import { Background } from '@/components/Background';
import { Footer } from '@/components/footer/footer';
import { InputLogin } from '@/components/inputs/inputLogin';
import TXTOptions from '@/components/TXTOption'; 
import api from '@/utils/api';
import * as SecureStore from 'expo-secure-store';

export default function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router= useRouter();
    const [loading, setLoading] = useState(false);
 
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
         
            router.push('/(tabs)/calendario');

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
                            <InputLogin email={email} senha={senha} setEmail={setEmail} setSenha={setSenha}/>
                            <Pressable onPress={redefinirSenha}>
                                <Text style={styles.txtSenha}>Esqueci minha senha</Text>
                            </Pressable> 
                        </View>

                        <View style={[styles.boxBottom,{height:hp(20)}]}>   
                            <Button onPress={userLogin}>
                                <Button.Title>Entrar</Button.Title>
                            </Button>

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