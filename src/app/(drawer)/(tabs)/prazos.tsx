import React, { useState, useMemo } from 'react';
import { Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { styles} from "@/app/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from '@/components/header/header';
import { Background } from '@/components/Background';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import { differenceInDays } from 'date-fns';
import { useEditais,Prazo,Edital } from '@/context/editaisContext';
import { Search } from '@/components/search';
import { Iten} from '@/components/renderItem';

export default function Prazos ()  {

    const { editais } = useEditais();
    const [searchText, setSearchText] = useState('');
    const { bottom } = useSafeAreaInsets();
    const [loading, setLoading] = useState(false);
    const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

    const filteredEditais = useMemo(() => {
            return editais.filter((edital) =>
                edital.titulo.toLowerCase().includes(searchText.toLowerCase())
            );
        }, [editais, searchText]);
    
        const handleToggleExpand = (id: string) => {
            setExpandedItemId(expandedItemId === id ? null : id);
        };
    
        const renderItem = ({ item }: { item: Edital }) => (
            <Iten
                item={item}
                expanded={item.id === expandedItemId}
                onToggleExpand={() => handleToggleExpand(item.id)}
            />
        )

     return (
            <SafeAreaView>
                <Background>
                    <Header />
                    <ContainerDrawer style={{ paddingBottom: bottom }}>
                        <Search>
                            <Search.Inp
                            value={searchText}
                            onChangeText={(t) => setSearchText(t)}/>
                        </Search>
    
                        <View style={[styles.boxMiddle, { height: '100%', paddingBottom:bottom }]}>
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

