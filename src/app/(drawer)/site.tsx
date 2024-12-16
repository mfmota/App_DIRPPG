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
                 <Site/>
            </Background>
        </SafeAreaView>

    );

}