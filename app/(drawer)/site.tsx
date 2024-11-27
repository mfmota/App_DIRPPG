import React from 'react';
import {SafeAreaView,View,ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {Header} from '~/components/header/header';
import { Background } from '~/components/Background';
import { styles } from '../styles';

export default function site(){
    
    return(
        <SafeAreaView>
            <Background>
                <Header/>
                <View style={styles.site}>
                    <WebView
                    source={{uri:'https://www.utfpr.edu.br/estrutura/pesquisa-e-pos-graduacao/dirppg/curitiba'}}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <View style={{justifyContent:'center'}}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    )} 
                    style={{ flex: 1 }}
                    /> 
                </View>  
            </Background>
        </SafeAreaView>

    );

}