import React ,{useState}  from 'react';
import {Text,View,TextInput,SafeAreaView,Alert} from 'react-native';
import{styles, useGlobalFonts} from "./styles";
import { router } from 'expo-router';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { Background } from '~/components/Background';
import { InputView } from '~/components/InputView';
import CustomDropdown from '~/components/CustomDropdown';
import { Footer } from '~/components/footer/footer';
import TXTOptions from '~/components/TXTOption';
import api from '../utils/api';

const Cadastro: React.FC = () => {

    const fontsLoaded = useGlobalFonts();
   
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [senhaConf, setSenhaConf] = useState<string>('');
    const [nucleoSelecionados, setNucleoSelecionados] = useState<string[]>([]);

    const data = [
        { id: '1', name: 'DIRPPG-CT' },
        { id: '2', name: 'PROPPG' },
        { id: '3', name: 'CPGEI' },
        { id: '4', name: 'PPGA' },
        { id: '5', name: 'PPGCA' },
        { id: '6', name: 'PPGCTA' },
        { id: '7', name: 'PPGEB' },
        { id: '8', name: 'PPGEC' },
        { id: '9', name: 'PPGEF' },
        { id: '10', name: 'PPGEL' },
        { id: '11', name: 'PPGEM' },
        { id: '12', name: 'PPGEFA' },
        { id: '13', name: 'FCET' },
        { id: '14', name: 'PGP' },
        { id: '15', name: 'PPGQ' },
        { id: '16', name: 'PPGSAU' },
        { id: '17', name: 'PPGSE' },
        { id: '18', name: 'PPGTE' },
        { id: '19', name: 'PROFMAT' },
        { id: '20', name: 'PROFIAP' },
        { id: '21', name: 'DIREC-CT' },
        { id: '22', name: 'DIRGE-CT' },
        { id: '23', name: 'DIRPLAD-CT' },
      ];

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

    if (!fontsLoaded) {
        return null; 
      }
    

    return(
        <SafeAreaView>
            <Background>
                <Container>          
                    <View style={[styles.boxTop,{height:hp(13),paddingTop:'5%'}]}>
                        <Text style={[styles.title,{fontSize:20}]}>Cadastro</Text> 
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

                        <CustomDropdown
                        data={data}
                        selectedValues={nucleoSelecionados}
                        onSelect={setNucleoSelecionados}
                        />
                            
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
                    </View>    

                    <View style={[styles.boxBottom,{ height:hp(15)}]}>
                        <Button
                        title='Criar Conta'
                        onPress={addBd}
                        />
                        <TXTOptions
                            title1='Já tem conta?'
                            title2='Faça Login'
                            style={{flexDirection:'row',marginLeft:'10%'}}
                            onPress={()=>router.push('/')}
                        />
                    </View>
                   <Footer/>
                </Container>
            </Background>
        </SafeAreaView>
    );

};

export default Cadastro;