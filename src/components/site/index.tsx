import {View,ActivityIndicator} from "react-native" 
import {WebView} from 'react-native-webview';

import {s} from "./styles"

export function Site (){

    return(
        <View style={s.container}>
            <WebView
                source={{uri:'https://www.utfpr.edu.br/estrutura/pesquisa-e-pos-graduacao/dirppg/curitiba'}}
                startInLoadingState={true}
                style={{ flex: 1 }}
                renderLoading={() => (
                    <View style={{justifyContent:'center'}}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )} 
                
            /> 
        </View> 
    )

}