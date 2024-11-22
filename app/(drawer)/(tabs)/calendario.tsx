import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList,ActivityIndicator } from 'react-native';
import { styles, useGlobalFonts } from "../../styles";
import api from '../../../utils/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from '../../../components/header/header';
import { Background } from '~/components/Background';
import { ContainerDrawer } from '~/components/ContainerDrawer';
import * as SecureStore from 'expo-secure-store';

export type Edital = {
    id: string;
    nucleo:string;
    link1:string;
    link2:string;
    descricao: string;
    atividade: string;
    periodo: string;
    titulo: string;
};

export default function Editais() {
    const fontsLoaded = useGlobalFonts();
    const [editais, setEditais] = useState<Edital[]>([]);
    const [nucleos,setNucleos] = useState<number []>([]);
    const [searchText, setSearchText] = useState<string>('');
    const { bottom } = useSafeAreaInsets();
    const [userId, setUserId] = useState<string | null>(null);
    const [editalId, setEditalId] = useState<number []>([]);
    const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); 

    useEffect(() => {
        setLoading(true); 
        const fetchUserId = async () => {
            try {
                const id = await SecureStore.getItemAsync('id');
                setUserId(id);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {  
            const fetchUserNucleos = async (userId: number) => {
                try {
                    const response = await api.get("/usuarios_nucleos", {
                        params: { usuario_id: userId }
                    });
                    
                    setNucleos(response.data);
                    await SecureStore.setItemAsync('nucleos',JSON.stringify(response.data));
                    
                } catch (error) {
                    console.error("Erro ao buscar núcleos do usuário", error);
                }
            };
            const numericUserId = parseInt(userId, 10);
            fetchUserNucleos(numericUserId);
        };
    }, [userId]); 

    useEffect(() => {
        if (nucleos.length > 0) {
            const fetchEditaisID = async (nucleosIds: number[]) => {
                try {
                    const responseNucleos = await api.get('/nucleos_editais', { 
                        params:{nucleosIds} 
                    }); 
                    const editalIds = responseNucleos.data; 

                    if (editalIds.length === 0) {
                        console.log("Nenhum edital encontrado para os núcleos fornecidos.");
                        setEditalId([]); 
                        return;
                    };

                    console.log(editalIds);
                    setEditalId(editalIds);
                    console.log(editalId);
                    
                } catch (error) {
                    console.error("Erro ao buscar id edital", error);
                    return;
                }
            };
            fetchEditaisID(nucleos);
        }
    }, [nucleos]);

    useEffect(() =>{
        if(editalId.length > 0){

            const fetchEditais = async (editaisIds: number[]) => {
                try{
                    const response = await api.get('/editais',{
                        params:{id: editaisIds}
                    });
                    const editais = response.data;
                    setEditais(editais); 

                    await SecureStore.setItemAsync('editais',JSON.stringify(editais));

                }catch(error){
                    console.error('erro ao  buscar editais',error);
                }  

                finally {
                    setLoading(false);  
                }
            }    
            fetchEditais(editalId);
        }
    },[editalId]);

    console.log(editais);

    const filteredEditais = editais.filter((edital) => {
        return edital;
        //return edital.titulo.toLowerCase().includes(searchText.toLowerCase());
    });

    const renderItem = ({ item }: { item: Edital }) => (
        <View style={styles.item}>
            <TouchableOpacity
                style={styles.list}
                onPress={() => setExpandedItemId(expandedItemId === item.id ? null : item.id)}>
                <View style={{ flexDirection: 'column', width: '90%' }}>
                    <Text style={styles.txtEvento}>{item.titulo}</Text>
                </View>
                <AntDesign style={{ justifyContent: 'flex-end' }} name={expandedItemId === item.id ? "up" : "down"} size={18} color="black" />
            </TouchableOpacity>

            {expandedItemId === item.id && (
                <View style={styles.dropdown}>
                    <Text style={styles.dropdownItem}>Núcleo: {item.nucleo}</Text>
                    <Text style={styles.dropdownItem}>Descrição: {item.descricao}</Text>
                    <Text style={styles.dropdownItem}>Atividade: {item.atividade}</Text>
                    <Text style={styles.dropdownItem}>Período: {item.periodo}</Text>
                    <Text style={styles.dropdownItem}>Link 1: {item.link1}</Text>
                    <Text style={styles.dropdownItem}>Link 2: {item.link2}</Text>
                </View>
            )}
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
                            <TouchableOpacity onPress={() => {}} style={styles.filterButton}>
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
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : filteredEditais.length > 0 ? (
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
