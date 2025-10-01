import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface LoggedEvent {
    id: string;
    type: string;
    emoji: string;
    painLevel?: number;
    painLocations?: string[];
    notes?: string;
    timestamp: Date;
}

interface EventHistoryContextType {
    eventHistory: LoggedEvent[];
    addEvent: (event: LoggedEvent) => void;
    updateEvent: (id: string, updated: Partial<LoggedEvent>) => void;
    deleteEvent: (id: string) => void;
    clearHistory: () => void;
}

const EventHistoryContext = createContext<EventHistoryContextType | undefined>(undefined);

export const useEventHistory = () => {
    const context = useContext(EventHistoryContext);
    if (!context) {
        throw new Error('useEventHistory must be used within an EventHistoryProvider');
    }
    return context;
};

interface EventHistoryProviderProps {
    children: ReactNode;
}

export const EventHistoryProvider: React.FC<EventHistoryProviderProps> = ({ children }) => {
    const [eventHistory, setEventHistory] = useState<LoggedEvent[]>([]);

    const addEvent = (event: LoggedEvent) => {
        setEventHistory(prev => [event, ...prev]);
    };

    const updateEvent = (id: string, updated: Partial<LoggedEvent>) => {
        setEventHistory(prev => prev.map(ev => ev.id === id ? { ...ev, ...updated } : ev));
    };

    const deleteEvent = (id: string) => {
        setEventHistory(prev => prev.filter(ev => ev.id !== id));
    };

    const clearHistory = () => {
        setEventHistory([]);
    };

    return (
        <EventHistoryContext.Provider value={{ eventHistory, addEvent, updateEvent, deleteEvent, clearHistory }}>
            {children}
        </EventHistoryContext.Provider>
    );
};