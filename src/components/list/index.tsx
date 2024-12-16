import {FlatList} from "react-native"
import { useState } from "react";
import { Edital} from '@/context/editaisContext';
import { Iten} from '@/components/renderItem';

type Props = {
    editais:Edital[],
}

export function List({editais}:Props){

    const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

    const handleToggleExpand = (id: string) => {
        setExpandedItemId(expandedItemId === id ? null : id);
    };
    
    const renderItem = ({ item }: { item: Edital }) => (
        <Iten
            item={item}
            expanded={item.id === expandedItemId}
            onToggleExpand={() => handleToggleExpand(item.id)}
        />
    );

    return ( 
                            
        <FlatList
            data={editais}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
                          
    )

}