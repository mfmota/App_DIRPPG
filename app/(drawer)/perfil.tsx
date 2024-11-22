import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
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
import CustomDropdown from '~/components/CustomDropdown';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Perfil() {
    const fontsLoaded = useGlobalFonts();
    const [nome, setNome] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [senha, setSenha] = useState('');
    const [senhaConf, setSenhaConf] = useState('');
    const [nucleosSelecionados, setNucleosSelecionados] = useState<string[]>([]);
    const [nucelosIniciais,setNuclesIniciais] = useState<string[]>([]);
    const [isEditable,setIsEditable] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const id = await SecureStore.getItemAsync('id');
                const nucleos = await SecureStore.getItemAsync('nucleos');
                const email = await SecureStore.getItemAsync('email');
                const nome = await SecureStore.getItemAsync('nome');
                setNome(nome);
                setEmail(email);
                setId(id);
                if (nucleos) {
                    setNucleosSelecionados(JSON.parse(nucleos).map(String));
                    setNuclesIniciais(JSON.parse(nucleos).map(String));
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
            const dadosAtualizados = {id, nome, email, ...(senha ? { senha } : {}) };
            await api.put('/usuarios', dadosAtualizados);
        } catch (error) {
            console.error("Erro ao atualizar o perfil:", error);
        }

        try{

            const nucleosParaAdicionar = nucleosSelecionados.filter(nucleo => !nucelosIniciais.includes(nucleo));
            const nucleosParaRemover = nucelosIniciais.filter(nucleo => !nucleosSelecionados.includes(nucleo));

            console.log(nucleosParaAdicionar);
            console.log(nucleosParaRemover);
            
            if(nucleosParaAdicionar.length > 0){
                for (const nucleo of nucleosParaAdicionar) {
                    const idNucleo = parseInt(nucleo); 
                    try {
                        await api.post("/usuarios_nucleos", {usuario_id: id,nucleo_id: idNucleo,});
                    } catch (error) {
                        console.error("Erro ao cadastrar nucleo_usuario:", error);
                    }
                }
            }
            if(nucleosParaRemover.length > 0){
                for (const nucleo of nucleosParaRemover) {
                    const idNucleo = parseInt(nucleo);
                    try {
                        await api.delete("/usuarios_nucleos", { data: { usuario_id: id, nucleo_id: idNucleo } });
                    } catch (error) {
                        console.error("Erro ao remover nucleo_usuario:", error);
                    }
                }
            }
        }catch(error){
            console.error("Erro ao atualizar núcleos:", error);
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
                    <View style={[styles.boxTop, { height: hp(16), paddingTop: '5%'}]}>
                        <Text style={styles.title}>Atualizar Dados</Text>
                        <TouchableOpacity style={{alignSelf:'flex-end',marginRight:'20%',marginTop:"5%"}} onPress={()=>setIsEditable(!isEditable)}>
                            <FontAwesome5 name="pencil-alt" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.boxMiddle, { overflow: "visible", height: hp(35) }]}>
                        <InputView>
                            <Ionicons style={styles.iconInput} name="person" size={18} color="black" />
                            <TextInput style={styles.input}
                                placeholder="| Nome"
                                value={nome || ''}
                                onChangeText={setNome}
                                editable={isEditable}
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
                                editable={isEditable}
                            />
                        </InputView>
                        <CustomDropdown
                        selectedValues={nucleosSelecionados}
                        onSelect={setNucleosSelecionados}
                        disabled={!isEditable}
                        />
                        <InputView>
                            <Fontisto style={styles.iconInput} name="locked" size={17} color="black" />
                            <TextInput style={styles.input}
                                placeholder="| Senha"
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                                editable={isEditable}
                            />
                        </InputView>
                        <InputView>
                            <Fontisto style={styles.iconInput} name="locked" size={17} color="black" />
                            <TextInput style={styles.input}
                                placeholder="| Confirme a Senha"
                                secureTextEntry
                                value={senhaConf}
                                onChangeText={setSenhaConf}
                                editable={isEditable}
                            />
                        </InputView>
                        <Button
                            title='Atualizar'
                            style={{marginTop:'15%'}}
                            onPress={atualizar}
                            disabled={!isEditable}
                        />
                    </View>
                </ContainerDrawer>
            </Background>
        </SafeAreaView>
    );
}
