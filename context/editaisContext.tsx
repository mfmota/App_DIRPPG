// src/context/EditaisContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Prazo = {
    id_edital: string;
    descricao: string;
    data: string;
};

type Edital = {
    id: string;
    nucleo: string;
    link1: string;
    link2: string;
    descricao: string;
    titulo: string;
    prazos: Prazo[];
};

interface EditaisContextProps {
    editais: Edital[];
    setEditais: React.Dispatch<React.SetStateAction<Edital[]>>;
}

const EditaisContext = createContext<EditaisContextProps | undefined>(undefined);

export const EditaisProvider = ({ children }: { children: ReactNode }) => {
    const [editais, setEditais] = useState<Edital[]>([]);

    return (
        <EditaisContext.Provider value={{ editais, setEditais }}>
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
