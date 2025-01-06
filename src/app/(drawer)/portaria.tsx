import React from 'react';
import {SafeAreaView} from 'react-native';
import {Header} from '@/components/header/header';
import { Background } from '@/components/Background';
import { Site } from '@/components/site';

export default function site(){
    
    return(
        <SafeAreaView>
            <Background>
                <Header/>
                 <Site
                 source = 'https://www.in.gov.br/en/web/dou/-/portaria-n-379-de-17-de-dezembro-de-2024-602581386'/>
            </Background>
        </SafeAreaView>

    );

}