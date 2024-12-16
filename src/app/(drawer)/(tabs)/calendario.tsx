import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import * as SecureStore from 'expo-secure-store';
import { GlobalEvents } from '@/utils/GlobalEvents';
import { useEditais, Edital,Prazo } from '@/context/editaisContext';
import { SafeAreaView } from "react-native";
import { ListEditais } from '@/components/listEditais';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Editais ()  {
    const {editais, setEditais} = useEditais();
    const [nucleos,setNucleos] = useState<number []>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [editalId, setEditalId] = useState<number []>([]);
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
    
    return (
        <SafeAreaProvider>
            <ListEditais
            editais={editais}
            loading = {loading}
            />
        </SafeAreaProvider>
        
    );
};

