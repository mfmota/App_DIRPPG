import {View,ActivityIndicator} from "react-native" 
import {WebView} from 'react-native-webview';

import {s} from "./styles"

type Props = {
    source:string;
}

export function Site ({source}:Props){

    return(
        <View style={s.container}>
            <WebView
                source={{uri:source}}
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