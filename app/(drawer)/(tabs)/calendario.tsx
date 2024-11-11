import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { styles, useGlobalFonts } from "../../styles";
import api from '../../../utils/api';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from '../../../components/header/header';
import { Background } from '~/components/Background';
import { ContainerDrawer } from '~/components/ContainerDrawer';
import * as SecureStore from 'expo-secure-store';

export type Edital = {
    id: string;
    titulo: string;
    descricao: string;
    dataDeInicio: string;
    dataDeFim: string;
    nucleoId: string;
};

export default function Editais() {
    const fontsLoaded = useGlobalFonts();
    const [editais, setEditais] = useState<Edital[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [userNucleos, setUserNucleos] = useState<string[]>([]); // Guardar os IDs dos núcleos do usuário
    const { top, bottom } = useSafeAreaInsets();
    const getUserId = async () => {
        const userId = await SecureStore.getItemAsync('userId');
        return userId;
      };
    const userId = getUserId();  

    console.log(userId); 
    
    // Função para buscar os núcleos do usuário
    const fetchUserNucleos = async (userId: string) => {
        try {
            const response = await api.get(`/usuarios_nucleos/${userId}`);
            setUserNucleos(response.data); // Supondo que retorna uma lista de IDs de núcleos
        } catch (error) {
            console.error("Erro ao buscar núcleos do usuário", error);
        }
    };

    // Função para buscar os editais de um núcleo
    const fetchEditais = async (nucleosIds: string[]) => {
        try {
            const response = await api.post('/editais', { nucleosIds }); // Envia os IDs dos núcleos
            setEditais(response.data); // Supondo que retorna os editais relacionados aos núcleos
        } catch (error) {
            console.error("Erro ao buscar editais", error);
        }
    };

    useEffect(() => {
        // Buscar editais sempre que os núcleos do usuário forem atualizados
        if (userNucleos.length > 0) {
            fetchEditais(userNucleos);
        }
    }, [userNucleos]);

    // Filtrar editais pela busca
    const filteredEditais = editais.filter((edital) => {
        return edital.titulo.toLowerCase().includes(searchText.toLowerCase());
    });

    const renderItem = ({ item }: { item: Edital }) => (
        <View style={styles.item}>
            <TouchableOpacity style={styles.list}>
                <View style={{ flexDirection: 'column', width: '90%' }}>
                    <Text style={styles.txtData}>{item.dataDeFim}</Text>
                    <Text style={styles.txtEvento}>{item.titulo}</Text>
                </View>
                <AntDesign style={{ justifyContent: 'flex-end' }} name="down" size={18} color="black" />
            </TouchableOpacity>
        </View>
    );

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView>
            <Background>
                <Header />
                <ContainerDrawer style={{ paddingBottom: bottom }}>
                    <View style={[styles.boxTop]}>
                        <View style={styles.buscaContainer}>
                            <TouchableOpacity onPress={() => { /* Implementar dropdown */ }} style={styles.filterButton}>
                                <AntDesign name="filter" size={24} color="#black" />
                            </TouchableOpacity>

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
                    <View style={[styles.boxMiddle, { height: '100%' }]}>
                        {filteredEditais.length > 0 ? (
                            <FlatList
                                data={filteredEditais}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        ) : (
                            <Text>Não há editais disponíveis.</Text>
                        )}
                    </View>
                </ContainerDrawer>
            </Background>
        </SafeAreaView>
       
    );
}
