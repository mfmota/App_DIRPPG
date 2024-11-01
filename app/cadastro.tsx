import React ,{useState}  from 'react';
import {Text,View,TextInput,SafeAreaView, Pressable,Alert} from 'react-native';
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
import SelectNucleo from '~/components/SelectNucleo';
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

                        <SelectNucleo  onSelect={setNucleoSelecionados}/>
                            
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