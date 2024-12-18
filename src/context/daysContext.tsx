import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Day = {
    data:string,
    descricao:string,
    titulo:string
}

interface DayContextData {
    day: Day[];
    setDay: React.Dispatch<React.SetStateAction<Day[]>>;
 
}

const DaysContext = createContext<DayContextData | undefined>(undefined);

export const DaysProvider = ({ children }: { children: ReactNode }) => {
    const [day, setDay] = useState<Day[]>([]);

    return (
        <DaysContext.Provider value={{ day, setDay}}>
            {children}
        </DaysContext.Provider>
    );
};

export const useDays = () => {
    const context = useContext(DaysContext);
    if (!context) {
        throw new Error("useDays must be used within a EditaisProvider");
    }
    return context;
};