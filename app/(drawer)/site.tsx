import React from 'react';
import {SafeAreaView,View} from 'react-native';
import {WebView} from 'react-native-webview';
import {Header} from '../../components/header/header';
import { Background } from '~/components/Background';
import { Container } from '~/components/Container';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { styles } from '../styles';

export default function site(){

    return(

        <SafeAreaView>
            <Background>
                <Header/>
                <View style={styles.site}>
                    <WebView
                    source={{uri:'https://www.utfpr.edu.br/estrutura/pesquisa-e-pos-graduacao/dirppg/curitiba'}}
                    />    
                </View>  
            </Background>
        </SafeAreaView>

    );

}