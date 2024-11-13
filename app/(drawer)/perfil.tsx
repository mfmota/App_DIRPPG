import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, TextInput } from 'react-native';
import { styles, useGlobalFonts } from "../styles";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header } from '../../components/header/header';
import { Background } from '~/components/Background';
import { Button } from '~/components/Button';
import { InputView } from '~/components/InputView';
import { ContainerDrawer } from '~/components/ContainerDrawer';
import * as SecureStore from 'expo-secure-store';
import api from '../../utils/api';
import SelectNucleoPerfil from '~/components/SelectNucleoPerfil';

export default function Perfil() {
    const fontsLoaded = useGlobalFonts();
    const [nome, setNome] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [senha, setSenha] = useState('');
    const [senhaConf, setSenhaConf] = useState('');
    const [nucleosSelecionados, setNucleosSelecionados] = useState<string[]>([]);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const id = await SecureStore.getItemAsync('userId');
                const nucleos = await SecureStore.getItemAsync('nucleos');
                const email = await SecureStore.getItemAsync('email');
                const nome = await SecureStore.getItemAsync('nome');
                setNome(nome);
                setEmail(email);
                setId(id);
                if (nucleos) {
                    setNucleosSelecionados(JSON.parse(nucleos));
                }
            } catch (error) {
                console.error("Erro ao carregar dados do perfil:", error);
            }
        };
        carregarDados();
    }, []);

    const atualizar = async () => {
        if (senha !== senhaConf) {
            alert('As senhas precisam ser iguais');
            return;
        }

        try {
            const dadosAtualizados = { nome, email, ...(senha ? { senha } : {}) };
            await api.put(`usuarios/${id}`, dadosAtualizados);
            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error("Erro ao atualizar o perfil:", error);
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView>
            <Background>
                <Header />
                <ContainerDrawer>
                    <View style={[styles.boxTop, { height: hp(13), paddingTop: '5%' }]}>
                        <Text style={[]}>Atualizar</Text>
                    </View>

                    <View style={[styles.boxMiddle, { overflow: "visible", height: hp(35) }]}>
                        <InputView>
                            <Ionicons style={styles.iconInput} name="person" size={18} color="black" />
                            <TextInput style={styles.input}
                                placeholder="| Nome"
                                value={nome || ''}
                                onChangeText={setNome}
                            />
                        </InputView>
                        <InputView>
                            <MaterialIcons style={styles.iconInput} name="email" size={18} color="black" />
                            <TextInput style={styles.input}
                                placeholder='email'
                                keyboardType='email-address'
                                autoComplete='email'
                                value={email || ''}
                                onChangeText={setEmail}
                            />
                        </InputView>
                        <SelectNucleoPerfil
                         onSelect={setNucleosSelecionados}
                         selectedValues={nucleosSelecionados} />
                        <InputView>
                            <Fontisto style={styles.iconInput} name="locked" size={17} color="black" />
                            <TextInput style={styles.input}
                                placeholder="| Senha"
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                            />
                        </InputView>
                        <InputView>
                            <Fontisto style={styles.iconInput} name="locked" size={17} color="black" />
                            <TextInput style={styles.input}
                                placeholder="| Confirme a Senha"
                                secureTextEntry
                                value={senhaConf}
                                onChangeText={setSenhaConf}
                            />
                        </InputView>
                        <Button
                            title='Atualizar'
                            style={{}}
                            onPress={atualizar}
                        />
                    </View>
                </ContainerDrawer>
            </Background>
        </SafeAreaView>
    );
}
