import {View,TouchableOpacity,Text,Linking} from "react-native"
import {s} from "./styles"
import {IconChevronDown} from "@tabler/icons-react-native"
import {Edital} from '@/context/editaisContext';

type Props = {
    item:Edital,
    expanded: boolean;
    onToggleExpand: () => void;
}

export function Iten({item,expanded,onToggleExpand}:Props){
    return (
        <View style={s.item}>
            <TouchableOpacity style={s.list} onPress={onToggleExpand}>  
                <View style={{ flexDirection: 'column', width: '90%' }}>
                    <Text style={s.txtEvento}>{item.titulo}</Text>
                </View>
                <IconChevronDown style={{ justifyContent: 'flex-end' }} size={18} color="black" />
            </TouchableOpacity>
            
            {expanded && (
                <View style={s.dropdown}>
                    <Text style={s.dropdownItem}>Núcleo: {item.nucleo}</Text>
                    <Text style={s.dropdownItem}>Descrição: {item.descricao}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(item.link1)}>
                        <Text style={s.dropdownItemLink}>Página do Edital: </Text>
                        <Text style={s.dropdownLink}>{item.link1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(item.link2)}>
                        <Text style={s.dropdownItemLink}>Edital:</Text>
                        <Text style={s.dropdownLink}>{item.link2}</Text>
                    </TouchableOpacity>
                                    
                    <Text style={s.dropdownItem}>Cronograma:</Text>
                    {item.prazos[0] != null ? (
                        item.prazos.map((prazo, index) => (
                            <Text key={index} style={s.dropdownItem}>
                                {prazo.descricao}: {prazo.data}
                            </Text>
                        ))
                    ) : (
                        <Text style={s.dropdownItem}>Cronograma não encontrado</Text>
                    )}
                </View>
            )}
        </View>
    )
}

