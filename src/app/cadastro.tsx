import React ,{useState}  from 'react';
import {Text,View,SafeAreaView,Alert,ActivityIndicator} from 'react-native';
import{styles} from "./styles";
import { router } from 'expo-router';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button } from '@/components/button';
import { Container } from '@/components/Container';
import { Background } from '@/components/Background';
import { InputCadastro } from '@/components/inputs/inputCadastro';
import CustomDropdown from '@/components/dropdown';
import { Footer } from '@/components/footer/footer';
import TXTOptions from '@/components/TXTOption';
import api from '@/utils/api';

const Cadastro: React.FC = () => {


    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [senhaConf, setSenhaConf] = useState<string>('');
    const [nucleoSelecionados, setNucleoSelecionados] = useState<string[]>([]);

    const addBd = async () =>{
        if(nome === '' ||email === '' ||senha === '' || senhaConf ==''){
        alert('Preencha todos os campos');
        return;
        }

        if(senha !== senhaConf){
            alert('As senhas precisam ser iguais');
            return;
        }
        try {
            const response = await api.post("/usuarios/check-email", { email });
            if (response.data.exists) {
                alert('Email já cadastrado');
                return;
            }
        }catch(error){

        }  
        
        try {
            const usuarioData = {
                nome: nome,
                email: email,
                senha: senha,
            };

            const response = await api.post("/usuarios", usuarioData);
            const usuarioId = response.data.dadosUsuario.id; 

            for (const nucleo of nucleoSelecionados) {
                const idNucleo = parseInt(nucleo); 
                try {
                    await api.post("/usuarios_nucleos", {usuario_id: usuarioId,nucleo_id: idNucleo,});
                } catch (error) {
                    console.error("Erro ao cadastrar nucleo_usuario:", error);
                }
            }
            
            Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
            router.push('/'); 
        } catch (error) {
            console.error("Erro:", error);
            Alert.alert('Erro', 'Erro ao cadastrar usuário');
        }     
        
    }
    
    React.useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 200); 
        return () => clearTimeout(timeout); 
    }, []);
    
    return (
        <SafeAreaView>
            <Background>
                <Container>
                    {isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <>
                            <View style={[styles.boxTop, { height: hp(13), paddingTop: '5%' }]}>
                                <Text style={[styles.title, { fontSize: 20 }]}>Cadastro</Text>
                            </View>
    
                            <View style={[styles.boxMiddle, { overflow: "visible", height: hp(35) }]}>
                                
                                <CustomDropdown
                                    selectedValues={nucleoSelecionados}
                                    onSelect={setNucleoSelecionados}
                                />

                                <InputCadastro nome={nome} email={email} senha={senha} senhaConf={senhaConf} 
                                setNome={setNome} setEmail={setEmail} setSenha={setSenha} 
                                setSenhaConf={setSenhaConf}/>
                                
                            </View>
    
                            <View style={[styles.boxBottom, { height: hp(15) }]}>
                                <Button onPress={addBd} >
                                    <Button.Title>Cadastrar</Button.Title>
                                </Button>
                                <TXTOptions
                                    title1="Já tem conta?"
                                    title2="Faça Login"
                                    style={{ flexDirection: 'row', marginLeft: '10%' }}
                                    onPress={() => router.push('/')}
                                />
                            </View>
                            <Footer />
                        </>
                    )}
                    
                </Container>
            </Background>
        </SafeAreaView>
    );    
};

export default Cadastro;