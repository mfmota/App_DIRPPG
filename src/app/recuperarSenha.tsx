import React, {useState} from 'react';
import {Text,View,SafeAreaView} from 'react-native';
import{styles} from "./styles";
import { useRouter } from 'expo-router';
import {IconMail} from "@tabler/icons-react-native"
import { Button } from '@/components/button';
import { Container } from '@/components/Container';
import { Background } from '@/components/Background';
import { Footer } from '@/components/footer/footer';
import TXTOptions from '@/components/TXTOption';
import api from '@/utils/api';
import { Input } from '@/components/input';

export default function recuperarSenha(){

    const [email, setEmail] = useState('');
    const router = useRouter();

   
    async function solicitarRedefinicaoSenha() {
        try {
            const response = await api.post("/request", { email:email });
            alert(response.data.mensagem); 
            router.push('/'); 
        } catch (error) {
            console.log('Erro ao solicitar redefinição de senha: ' + error);
        }
    }

    return(
        <SafeAreaView>
            <Background>
                <Container>
                    <View style={[styles.boxTop,{marginTop:'20%',marginBottom:'10%'}]}>
                        <Text style={styles.title} >DIRPPG-CT</Text>  
                        <Text style={styles.subTitle}>Diretoria de Pesquisa e Pós-Graduação</Text>             
                    </View>
                    

                    <View style={styles.boxMiddle}>

                        <Text style={styles.txt1}>Esqueceu a senha?</Text>
                        <Text style={[styles.txt2,,{fontSize:12}]}>Informe seu email cadastrado para continuar</Text>
                        <Input>
                            <Input.Icon icon = {IconMail}/>
                            <Input.Title
                                placeholder="| Email"
                                keyboardType='email-address'
                                autoComplete='email'
                                value={email}
                                onChangeText={setEmail}
                            ></Input.Title>
                        </Input>
                        
                        <Button  style={{marginTop:'25%'}} onPress={solicitarRedefinicaoSenha}>
                            <Button.Title>Enviar</Button.Title>
                        </Button>
                        
                        <TXTOptions
                        title1=''
                        title2='Voltar'
                        style={{alignSelf:'center',marginRight:'14%'}}
                        onPress={()=>router.push('/')}
                        />
                    </View>
                    <Footer
                        style={{marginTop:'25%'}}/>
                </Container>                  
            </Background>
        </SafeAreaView>

    );


}