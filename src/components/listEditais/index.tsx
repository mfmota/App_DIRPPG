import { Text, View,ActivityIndicator, SafeAreaView} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from '@/components/header/header';
import { Background } from '@/components/Background';
import { ContainerDrawer } from '@/components/ContainerDrawer';
import { Search } from '@/components/search';
import { List } from '@/components/list';
import { useMemo,useState } from "react";
import { Edital} from '@/context/editaisContext';
import {s} from "./styles"

type Props = {
    editais:Edital[],
    loading:boolean
}


export function ListEditais({editais,loading= true}:Props){
    const { bottom } = useSafeAreaInsets();
    const [searchText, setSearchText] = useState<string>('');

    const filteredEditais = useMemo(() => {
        return editais.filter((edital) =>
            edital.titulo.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [editais, searchText]);

    return (
        <SafeAreaView>
            <Background>
                <Header/>
                <ContainerDrawer style={{ paddingBottom: bottom }}>
                    <Search>
                        <Search.Inp
                            value={searchText}
                            onChangeText={(t) => setSearchText(t)}/>
                    </Search>

                    <View style={s.boxMiddle}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : filteredEditais.length == 0 ? (
                            <Text>Não há editais disponíveis.</Text>              
                            ) : (
                                <List editais={filteredEditais}/>                  
                        )}
                    </View>
                </ContainerDrawer>
            </Background>
        </SafeAreaView>
    )
}