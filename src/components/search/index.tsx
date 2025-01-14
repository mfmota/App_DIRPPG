import React, { useState } from 'react';
import {View,TextInput,TextInputProps,TouchableOpacity,Modal,FlatList,Text} from "react-native"
import {IconSearch,IconFilter} from "@tabler/icons-react-native"
import {s} from "./styles"

const nucleosDisponiveis:Nucleo[] = [
    { id: 1, name: 'DIRPPG-CT' },
    { id: 2, name: 'PROPPG' },
    { id: 3, name: 'CPGEI' },
    { id: 4, name: 'PPGA' },
    { id: 5, name: 'PPGCA' },
    { id: 6, name: 'PPGCTA' },
    { id: 7, name: 'PPGEB' },
    { id: 8, name: 'PPGEC' },
    { id: 9, name: 'PPGEF' },
    { id: 10, name: 'PPGEL' },
    { id: 11, name: 'PPGEM' },
    { id: 12, name: 'PPGFA' },
    { id: 13, name: 'FCET' },
    { id: 14, name: 'PGP' },
    { id: 15, name: 'PPGQ' },
    { id: 16, name: 'PPGSAU' },
    { id: 17, name: 'PPGSE' },
    { id: 18, name: 'PPGTE' },
    { id: 19, name: 'PROFMAT' },
    { id: 20, name: 'PROFIAP' },
    { id: 21, name: 'DIREC-CT' },
    { id: 22, name: 'DIRGE-CT' },
    { id: 23, name: 'DIRPLAD-CT' },
    { id: 24, name: 'PPGPGP'},
]

interface Nucleo {
    id: number | number[];
    name: string;
    isHeader?: boolean;
}

interface SearchProps {
    meusNucleos: number[];
    onFiltroChange: (nucleosSelecionados: number[]) => void;
    children?: React.ReactNode;
}

function Search  ({meusNucleos,onFiltroChange, children }: SearchProps) {
  
    const nucleosAtualizados: Nucleo[] = [
        { id: meusNucleos, name: 'Meus Núcleos', isHeader: true },
        ...nucleosDisponiveis,
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [selecionados, setSelecionados] = useState<number[]>([]);

    const filterOn = () => {
        setSelecionados([]);
        setModalVisible(!modalVisible)
    }

    const toggleNucleo = (id: number|number[]) => {
        if (Array.isArray(id)) {
            const novosSelecionados = selecionados.some((nucleoId) => id.includes(nucleoId))
                ? selecionados.filter((nucleoId) => !id.includes(nucleoId)) 
                : [...selecionados, ...id]; 
            setSelecionados(novosSelecionados);
            onFiltroChange(novosSelecionados);
        } else {
            const novosSelecionados = selecionados.includes(id)
                ? selecionados.filter((nucleoId) => nucleoId !== id)
                : [...selecionados, id]; 
            setSelecionados(novosSelecionados);
            onFiltroChange(novosSelecionados);
        }
    };

    return (
        <View style={[s.boxTop]}>
            <View style={s.buscaContainer}>
                <View style={s.inputViewAgenda}>
                    {children}
                    <IconSearch style={s.iconAgenda}  size={16} color="black"/>
                </View>
                <View style={s.filter}>
                    <TouchableOpacity onPress={filterOn}>
                        <IconFilter style={s.iconFilter} size={22} color="black" />
                    </TouchableOpacity>
                </View>
                
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={s.modalContainer}>
                    <FlatList
                        data={nucleosAtualizados}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        renderItem={({ item }) => {

                            const isSelected = Array.isArray(item.id)
                                ? item.id.every((id) => selecionados.includes(id)) // Verifica se todos os IDs do grupo estão selecionados
                                : selecionados.includes(item.id as number);
                            return(
                                <TouchableOpacity
                                style={[
                                    s.modalItem, // Estilo padrão
                                ]}
                                onPress={() => {
                                    toggleNucleo(item.id as number); 
                                    
                                }}
                                >
                                    <Text  style={isSelected ? s.selected : undefined}>{item.name}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {setModalVisible(false), setSelecionados([])}}
                        style = {s.close}
                    >
                        <Text style={s.txt}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

function Inp ({...rest}:TextInputProps){
    return(
        <TextInput
            style={s.inputAgenda}
            placeholder='Pesquisar'
            placeholderTextColor='#ddd'
            {...rest}
        />
    )
}

Search.Inp = Inp

export {Search}