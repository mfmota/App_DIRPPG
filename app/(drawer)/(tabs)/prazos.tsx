
import { Prazo } from "./calendario";
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList,ActivityIndicator } from 'react-native';
import { styles, useGlobalFonts } from "../../styles";
import api from '../../../utils/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from '~/components/header/header';
import { Background } from '~/components/Background';
import { ContainerDrawer } from '~/components/ContainerDrawer';
import * as SecureStore from 'expo-secure-store';
import { differenceInDays, compareAsc } from 'date-fns';

export default function prazos (){
    const fontsLoaded = useGlobalFonts();
    //const [editais, setEditais] = useState<Edital[]>([]);
    const [nucleos,setNucleos] = useState<number []>([]);
    const [searchText, setSearchText] = useState<string>('');
    const { bottom } = useSafeAreaInsets();
    const [userId, setUserId] = useState<string | null>(null);
    const [editalId, setEditalId] = useState<number []>([]);
    const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); 

    const getBackgroundColor = (dataDoFim: string) => {
        const hoje = new Date();
        const dataFim = new Date(dataDoFim);
        const diferencaDias = differenceInDays(dataFim, hoje);
    
        if (diferencaDias <= 1) {
            return '#ff3131'; 
        } else if (diferencaDias <= 3) {
            return '#ff914d'; 
        } else if (diferencaDias <= 5) {
            return '#ffbd59'; 
        } 
    };

    return (
        <SafeAreaView>
            <Background>
                <Header />
                <ContainerDrawer style={{ paddingBottom: bottom }}>
                    <View style={[styles.boxTop]}>
                        <View style={styles.buscaContainer}>
                            <View style={styles.inputViewAgenda}>
                                <TextInput
                                    style={styles.inputAgenda}
                                    placeholder='Pesquisar'
                                    placeholderTextColor='#ddd'
                                    value={searchText}
                                    onChangeText={(t) => setSearchText(t)} />
                                <Feather style={styles.iconAgenda} name="search" size={16} color="black" />
                            </View>
                        </View>
                    </View>
                </ContainerDrawer>
            </Background>
        </SafeAreaView>
       
    );
}