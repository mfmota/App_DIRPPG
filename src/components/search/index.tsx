import {View,TextInput,TextInputProps} from "react-native"
import {IconSearch} from "@tabler/icons-react-native"
import {s} from "./styles"


function Search({ children }: { children: React.ReactNode }){
    return (
        <View style={[s.boxTop]}>
            <View style={s.buscaContainer}>
                <View style={s.inputViewAgenda}>
                    {children}
                    <IconSearch style={s.iconAgenda}  size={16} color="black"/>
                </View>
            </View>
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