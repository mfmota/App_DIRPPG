import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ActivityIndicator,Alert } from 'react-native';
import { styles} from "@/app/styles";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header } from '@/components/header/header';
import { Background } from '@/components/Background';
import { Button } from '@/components/button';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import * as SecureStore from 'expo-secure-store';
import api from '@/utils/api';
import CustomDropdown from '@/components/dropdown';
import { InputCadastro } from '@/components/inputs/inputCadastro';
import { GlobalEvents } from '@/utils/GlobalEvents';

export default function Perfil() {

    const [isLoading,setIsLoading] = useState<boolean>(true);
    const [nome, setNome] = useState<string | null>(null);
    const [nomeAnterior, setNomeAnterior] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [emailAnteiror, setEmailAnterior]  = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [senha, setSenha] = useState('');
    const [senhaConf, setSenhaConf] = useState('');
    const [nucleosSelecionados, setNucleosSelecionados] = useState<string[]>([]);
    const [nucelosIniciais,setNuclesIniciais] = useState<string[]>([]);
    const [token,setToken] = useState<string | null>(null);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const id = await SecureStore.getItemAsync('id');
                const nucleos = await SecureStore.getItemAsync('nucleos');
                const email = await SecureStore.getItemAsync('email');
                const nome = await SecureStore.getItemAsync('nome');
                const token = await SecureStore.getItemAsync('token');
                setNome(nome);
                setNomeAnterior(nome);
                setEmail(email);
                setEmailAnterior(email);
                setId(id);
                setToken(token);
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
            const dadosAtualizados: { id: string | null; nome?: string; email?: string; senha?: string } = { id, ...(senha ? { senha } : {}) };

            if (nome !== nomeAnterior) {
                dadosAtualizados.nome = nome || undefined;
            }
    
            if (email !== emailAnteiror) {
                dadosAtualizados.email = email || undefined;
            }

            if (nome !== nomeAnterior || email !== emailAnteiror) {
                await api.patch('/usuarios', dadosAtualizados, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
        } catch (error) {
            console.error("Erro ao atualizar o perfil:", error);
        }

        try{

            const nucleosParaAdicionar = nucleosSelecionados.filter(nucleo => !nucelosIniciais.includes(nucleo));
            const nucleosParaRemover = nucelosIniciais.filter(nucleo => !nucleosSelecionados.includes(nucleo));
            
            if(nucleosParaAdicionar.length > 0){
                for (const nucleo of nucleosParaAdicionar) {
                    const idNucleo = parseInt(nucleo); 
                    try {
                        console.log(id,idNucleo)
                        await api.post("/usuarios_nucleos", {usuario_id: id,nucleo_id: idNucleo,});
                    } catch (error) {
                        console.error("Erro ao cadastrar nucleo_usuario:", error);
                    }
                }
            }
            if(nucleosParaRemover.length > 0){
                for (const nucleo of nucleosParaRemover) {
                    const idNucleo = parseInt(nucleo);
                    console.log('Tentando remover associação:', { usuario_id: id, nucleo_id: idNucleo });

                    try {
                        if(id!==null )
                        await api.delete("/usuarios_nucleos", { data: { usuario_id: parseInt(id), nucleo_id: idNucleo} });
                    } catch (error) {
                        console.error("Erro ao remover nucleo_usuario:", error);
                    }
                }
            }
            Alert.alert('Sucesso', 'Usuário atualizado com sucesso');
            GlobalEvents.emit('nucleosAtualizados');
            GlobalEvents.emit('updateFlagChanged', true); 

        }catch(error){
            console.error("Erro ao atualizar núcleos:", error);
            
        }
    };

    const confirmarAtualizacao = () => {
        Alert.alert(
            "Confirmar atualização",
            "Deseja realmente atualizar o perfil?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Atualizar", onPress: atualizar }
            ]
        );
    };

    React.useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 300); 
        return () => clearTimeout(timeout); 
    }, []);

    return (
        <SafeAreaView>
            <Background>
                <Header />
                <ContainerDrawer>

                    {isLoading ? (
                        <ActivityIndicator/>
                    ):
                    
                    (
                        <>
                            <View style={[styles.boxTop, { height: hp(16), paddingTop: '5%'}]}>
                                <Text style={[styles.title,{fontSize:30}]}>Atualizar Dados</Text>
                            </View>

                            <View style={[styles.boxMiddle, { overflow: "visible", height: hp(35) }]}>
                                <CustomDropdown
                                selectedValues={nucleosSelecionados}
                                onSelect={setNucleosSelecionados}
                                />
                              
                                <InputCadastro nome={nome || ''} email={email || ''} senha={senha} senhaConf={senhaConf} 
                                    setNome={setNome} setEmail={setEmail} setSenha={setSenha} 
                                    setSenhaConf={setSenhaConf}/>
                             
                                <Button style={{marginTop:'15%'}} onPress={confirmarAtualizacao}>
                                    <Button.Title>Atualizar</Button.Title>
                                </Button>
                            </View>
                        </>
                    )}
                </ContainerDrawer>
            </Background>
        </SafeAreaView>
    );
}
