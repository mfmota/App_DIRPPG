import React, { useState, useEffect,useMemo } from 'react';
import { Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList,ActivityIndicator, Linking } from 'react-native';
import { styles, useGlobalFonts } from "../../styles";
import api from '../../../utils/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from '~/components/header/header';
import { Background } from '~/components/Background';
import { ContainerDrawer } from '~/components/ContainerDrawer';
import * as SecureStore from 'expo-secure-store';
import { GlobalEvents } from '~/utils/GlobalEvents';
import { EditaisProvider, useEditais } from '../../../context/editaisContext';

export type Prazo = {
    id_edital: string;
    descricao:string;
    data:string;
};

export type Edital = {
    id: string;
    nucleo:string;
    link1:string;
    link2:string;
    descricao: string;
    titulo: string;
    prazos: Prazo[];
};

const Editais = () => {
    const fontsLoaded = useGlobalFonts();
    const [editais, setEditais] = useState<Edital[]>([]);
    const [nucleos,setNucleos] = useState<number []>([]);
    const [searchText, setSearchText] = useState<string>('');
    const { bottom } = useSafeAreaInsets();
    const [userId, setUserId] = useState<string | null>(null);
    const [editalId, setEditalId] = useState<number []>([]);
    const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); 
    const [updateFlag, setUpdateFlag] = useState<boolean>(false);

    useEffect(() => {
        const onUpdateFlagChanged = (flag: boolean) => {
            setUpdateFlag(flag); 
        };
        GlobalEvents.on('updateFlagChanged', onUpdateFlagChanged);
        return () => {
            GlobalEvents.off('updateFlagChanged', onUpdateFlagChanged);
        };
    }, []);

    useEffect(() => {
        const fetchNucleos = async () => {
            setLoading(true);
            try {
                const cachedNucleos = await SecureStore.getItemAsync('nucleos');
                const id = await SecureStore.getItemAsync('id');
    
                if (id) setUserId(id);

                if(updateFlag && id){
                    const numericUserId = parseInt(id, 10);
                    const responseNucleos = await api.get('/usuarios_nucleos', { params: { usuario_id: numericUserId } });
                    const fetchedNucleos = responseNucleos.data;
                    setNucleos(fetchedNucleos);
                    await SecureStore.setItemAsync('nucleos', JSON.stringify(fetchedNucleos));
                }
                else if (cachedNucleos) {
                    setNucleos(JSON.parse(cachedNucleos));
                } else if (id) {
                    const numericUserId = parseInt(id, 10);
                    const responseNucleos = await api.get('/usuarios_nucleos', { params: { usuario_id: numericUserId } });
                    const fetchedNucleos = responseNucleos.data;
                    setNucleos(fetchedNucleos);
                    await SecureStore.setItemAsync('nucleos', JSON.stringify(fetchedNucleos));
                }
            } catch (error) {
                console.error('Erro ao buscar núcleos:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchNucleos();
    }, [updateFlag]);
    
    useEffect(() => {
        const fetchEditais = async () => {
            if (nucleos.length === 0) return;
    
            setLoading(true);
            try {
                const responseEditaisId = await api.get('/nucleos_editais', { params: { nucleosIds: nucleos } });
                const editalIds = responseEditaisId.data;
                setEditalId(editalIds);
    
                if (editalIds.length > 0) {
                    const [editaisResponse, prazosResponse] = await Promise.all([
                        api.get('/editais', { params: { id: editalIds } }),
                        api.get('/prazos', { params: { id: editalIds } }),
                    ]);
                    const editais = editaisResponse.data;
                    const prazos = prazosResponse.data;
    
                    const updatedEditais = editais.map((edital: Edital) => ({
                        ...edital,
                        prazos: prazos.filter((prazo: Prazo) => prazo.id_edital === edital.id),
                    }));
                    setEditais(updatedEditais);
                }else{
                    setEditais([]);
                }
            } catch (error) {
                console.error('Erro ao buscar editais:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchEditais();
    }, [nucleos]);
    
    
    const filteredEditais = useMemo(() => {
        return editais.filter((edital) =>
            edital.titulo.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [editais, searchText]);

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
                    <TouchableOpacity onPress={() => Linking.openURL(item.link1)}>
                        <Text style={styles.dropdownItemLink}>Página do Edital: </Text>
                        <Text style={styles.dropdownLink}>{item.link1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(item.link2)}>
                        <Text style={styles.dropdownItemLink}>Edital:</Text>
                        <Text style={styles.dropdownLink}>{item.link2}</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.dropdownItem}>Cronograma:</Text>
                    {item.prazos[0] != null ? (
                        item.prazos.map((prazo, index) => (
                            <Text key={index} style={styles.dropdownItem}>
                                {prazo.descricao}: {prazo.data}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.dropdownItem}>Cronograma não encontrado</Text>
                    )}
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
                        ) : filteredEditais.length == 0 ? (
                            <Text>Não há editais disponíveis.</Text>
                            
                        ) : (
                            <FlatList
                                data={filteredEditais}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                        )}
                    </View>
                </ContainerDrawer>
            </Background>
        </SafeAreaView>
       
    );
};


const EditaisScreenWithProvider = () => {
    return (
        <EditaisProvider>
            <Editais />
        </EditaisProvider>
    );
};