import React,{useState} from 'react';
import {Text,View,SafeAreaView,ActivityIndicator} from 'react-native'
import{styles} from "../styles"
import {Header} from '@/components/header/header';
import { Background } from '@/components/Background';
import { Container } from '@/components/Container';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Contact from '@/components/Contact';
export default function prazos (){ 

    const [isLoading, setIsLoading] = useState<boolean>(true);

    React.useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 300); 
        return () => clearTimeout(timeout); 
    }, []);

    return(

        <SafeAreaView>
            <Background>
                <Header/>

                <Container>

                    {isLoading ? (
                        <ActivityIndicator/>
                    ):(
                        <>
                            <View style={[styles.boxTop,{height:hp(10),paddingTop:'2%'}]}>
                                <Text style={[styles.title]}>Contato</Text>
                            </View>    

                            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
                                <Contact
                                    secretaria='DIRPPG-CT'
                                    email = "dirppcuritiba@gmail.com" 
                                    tel = "(41) 3310-4545"
                                    local = "Av. Sete de Setembro, 3.165 – Curitiba PR. Sala: CJ – 007"
                                />      

                                <Contact
                                    secretaria='Stricto - Sede Centro'
                                    email = "strictocentro-ct@utfpr.edu.br" 
                                    tel = "(41) 3310-4680"
                                    local = "Av. Sete de Setembro, 3.165 – Curitiba PR. Sala: CA – 304"
                                />

                                <Contact
                                    secretaria='Stricto - Sede Ecoville'
                                    email = "stricto-ecoville-ct@utfpr.edu.br" 
                                    tel = "(41) 3279-6816"
                                    local = "R. Dep. Heitor Alencar Furtado, 5000 - Curitiba PR. Sala: EB – 004"
                                />        
                            </View>
                        </>
                    )}
                </Container>
            </Background>
        </SafeAreaView>


    );

}