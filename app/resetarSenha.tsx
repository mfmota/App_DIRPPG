import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, SafeAreaView, Alert } from 'react-native';
import { styles, useGlobalFonts } from "./styles";
import { useRouter } from 'expo-router';
import Fontisto from '@expo/vector-icons/Fontisto';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { Background } from '~/components/Background';
import { Footer } from '~/components/footer/footer';
import { InputView } from '~/components/InputView';
import api from '../utils/api';
import * as Linking from 'expo-linking';

export default function ResetarSenha() {

    const fontsLoaded = useGlobalFonts();

    const [senha, setSenha] = useState('');
    const [senhaConf, setSenhaConf] = useState('');
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const handleDeepLink = (event: { url: string }) => {
            const data = Linking.parse(event.url);
            if (data.path === 'resetarSenha') {
                const token = Array.isArray(data.queryParams?.token) ? data.queryParams.token[0] : data.queryParams?.token;
                setToken(token || null);
            }
        };

        Linking.getInitialURL().then((url) => {
            if (url) {
                handleDeepLink({ url });
            }
        });
        
        const subscription = Linking.addEventListener('url', handleDeepLink);
     
        return () => {
            subscription.remove();
        };
    }, []);
   
    async function solicitarRedefinicaoSenha() {
        if (senha !== senhaConf) {
            alert('As senhas precisam ser iguais');
            return;
        }

        if (!token) {
            alert('Token inválido ou expirado');
            return;
        }

        try {
            const response = await api.post("/reset-password", { token, newPassword: senha });
            Alert.alert('Senha redefinida'); 
            router.push('/'); 
        } catch (error) {
            alert('Erro ao redefinir de senha: ' + error);
        }
    }

    if (!fontsLoaded) {
        return null; 
    }

    return (
        <SafeAreaView>
            <Background>
                <Container>
                    <View style={[styles.boxTop, { height: hp(20) }]}>
                        <Text style={styles.title}>DIRPPG-CT</Text>  
                        <Text style={styles.subTitle}>Diretoria de Pesquisa e Pós-Graduação</Text>             
                    </View>
                    
                    <View style={styles.boxMiddle}>
                        <Text style={styles.txt1}>Esqueceu a senha?</Text>
                        <Text style={styles.txt2}>Escolha uma nova senha</Text>
                        <InputView>
                            <Fontisto style={styles.iconInput} name="locked" size={17} color="black" />
                            <TextInput 
                                style={styles.input} 
                                placeholder="| Senha"
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                            />
                       </InputView>   
                        <InputView>
                            <Fontisto style={styles.iconInput} name="locked" size={17} color="black" />
                            <TextInput 
                                style={styles.input} 
                                placeholder="| Confirme a Senha"
                                secureTextEntry
                                value={senhaConf}
                                onChangeText={setSenhaConf}
                            />
                        </InputView>
                        
                        <Button
                            title='Enviar'
                            onPress={solicitarRedefinicaoSenha}
                            style={{ width: '35%' }}
                        />
                    </View>
                    <Footer style={{ marginTop: '18%' }} />
                </Container>                  
            </Background>
        </SafeAreaView>
    );
}
