import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Prazo = {
    id_edital: string;
    descricao: string;
    data: string;
};

export type Edital = {
    id: string;
    nucleo: string;
    link1: string;
    link2: string;
    descricao: string;
    titulo: string;
    prazos: Prazo[];
};

interface EditaisContextData {
    editais: Edital[];
    setEditais: React.Dispatch<React.SetStateAction<Edital[]>>;
 
}

const EditaisContext = createContext<EditaisContextData | undefined>(undefined);

export const EditaisProvider = ({ children }: { children: ReactNode }) => {
    const [editais, setEditais] = useState<Edital[]>([]);

    return (
        <EditaisContext.Provider value={{ editais, setEditais}}>
            {children}
        </EditaisContext.Provider>
    );
};

export const useEditais = () => {
    const context = useContext(EditaisContext);
    if (!context) {
        throw new Error("useEditais must be used within a EditaisProvider");
    }
    return context;
};
