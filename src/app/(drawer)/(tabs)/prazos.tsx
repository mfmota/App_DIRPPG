import React, { useState, useMemo } from 'react';
import { Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator,Linking } from 'react-native';
import { styles} from "@/app/styles";
import Feather from '@expo/vector-icons/Feather';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from '@/components/header/header';
import { Background } from '@/components/Background';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import { differenceInDays } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEditais } from '@/context/editaisContext';

type Prazo = {
    id_edital: string;
    descricao: string;
    data: string; 
    titulo: string;
};

type Edital = {
    id: string;
    titulo: string;
    descricao: string;
    nucleo: string;
    link1: string;
    link2: string;
    prazos: Prazo[];
};

export default function Prazos ()  {

    const { editais } = useEditais();
    const [searchText, setSearchText] = useState('');
    const { bottom } = useSafeAreaInsets();
    const [loading, setLoading] = useState(false);
    const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

    const getClosestPrazo = (prazos: Prazo[]): Prazo | null => {
        const hoje = new Date();
        let closestPrazo: Prazo | null = null;

        prazos.forEach((prazo) => {
            const dataPrazo = new Date(prazo.data);
            if (!closestPrazo || (dataPrazo >= hoje && dataPrazo < new Date(closestPrazo.data))) {
                closestPrazo = prazo;
            }
        });

        return closestPrazo;
    };

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
        } else {
            return '#90ee90'; 
        }
    };

    const filteredPrazos = useMemo(() => {
        return editais
            .flatMap((edital) =>
                edital.prazos.map((prazo) => ({
                    ...prazo,
                    titulo: edital.titulo,
                    nucleo: edital.nucleo,
                    link1: edital.link1,
                    link2: edital.link2,
                }))
            )
            .filter(
                (prazo) =>
                    prazo.descricao.toLowerCase().includes(searchText.toLowerCase()) ||
                    prazo.titulo.toLowerCase().includes(searchText.toLowerCase())
            );
    }, [editais, searchText]);

    const renderItem = ({ item }: { item: typeof filteredPrazos[0] }) => (
        <View style={styles.item}>
            <TouchableOpacity
                style={styles.list}
                onPress={() => setExpandedItemId(expandedItemId === item.id_edital ? null : item.id_edital)}
            >
                <View style={{ flexDirection: 'column', width: '90%' }}>
                    <Text style={styles.txtEvento}>{item.titulo}</Text>
                </View>
                <View
                    style={{
                        justifyContent: 'flex-end',
                        backgroundColor: getBackgroundColor(item.data),
                        padding: 5,
                        borderRadius: 12,
                    }}
                >
                    <AntDesign name="clockcircleo" size={18} color="white" />
                </View>
            </TouchableOpacity>

            {expandedItemId === item.id_edital && (
                <View style={styles.dropdown}>
                    <Text style={styles.dropdownItem}>Núcleo: {item.nucleo}</Text>
                    <Text style={styles.dropdownItem}>Descrição: {item.descricao}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(item.link1)}>
                        <Text style={styles.dropdownItemLink}>Página do Edital:</Text>
                        <Text style={styles.dropdownLink}>{item.link1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(item.link2)}>
                        <Text style={styles.dropdownItemLink}>Edital:</Text>
                        <Text style={styles.dropdownLink}>{item.link2}</Text>
                    </TouchableOpacity>
                    <Text style={styles.dropdownItem}>Cronograma:</Text>
                    <Text style={[styles.dropdownItem, { color: getBackgroundColor(item.data) }]}>
                        {item.descricao}: {item.data}
                    </Text>
                </View>
            )}
        </View>
    );
    

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
                                    placeholder='Pesquisar por prazos ou editais'
                                    placeholderTextColor='#ddd'
                                    value={searchText}
                                    onChangeText={(t) => setSearchText(t)}
                                />
                                <Feather style={styles.iconAgenda} name="search" size={16} color="black" />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.boxMiddle, { height: '100%' }]}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : filteredPrazos.length === 0 ? (
                            <Text>Nenhum prazo encontrado.</Text>
                        ) : (
                            <FlatList
                                data={filteredPrazos}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id_edital.toString()}
                            />
                        )} 
                    </View>
                </ContainerDrawer>
            </Background>
        </SafeAreaView>
    );
};

