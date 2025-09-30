import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface EventType {
    key: string;
    label: string;
    emoji: string;
    order: number;
}

interface EventTypesContextType {
    eventTypes: EventType[];
    addEventType: (eventType: Omit<EventType, 'key' | 'order'>) => void;
    updateEventType: (key: string, updates: Partial<Omit<EventType, 'key'>>) => void;
    deleteEventType: (key: string) => void;
    reorderEventTypes: (newOrder: EventType[]) => void;
    resetToDefaults: () => void;
}

const DEFAULT_EVENT_TYPES: EventType[] = [
    { key: 'pain-start', label: 'Pain Start', emoji: '⚡', order: 0 },
    { key: 'pain-ending', label: 'Pain End', emoji: '🕊️', order: 1 },
    { key: 'fatigue', label: 'Fatigue', emoji: '😴', order: 2 },
    { key: 'treatment', label: 'Treatment', emoji: '🩹', order: 3 },
    { key: 'food', label: 'Food', emoji: '🍎', order: 4 },
    { key: 'water', label: 'Water', emoji: '💧', order: 5 },
    { key: 'supplements', label: 'Supplements', emoji: '💊', order: 6 },
];

const EventTypesContext = createContext<EventTypesContextType | undefined>(undefined);

export const useEventTypes = () => {
    const context = useContext(EventTypesContext);
    if (!context) {
        throw new Error('useEventTypes must be used within an EventTypesProvider');
    }
    return context;
};

interface EventTypesProviderProps {
    children: ReactNode;
}

export const EventTypesProvider: React.FC<EventTypesProviderProps> = ({ children }) => {
    const [eventTypes, setEventTypes] = useState<EventType[]>(DEFAULT_EVENT_TYPES);

    const addEventType = (newEventType: Omit<EventType, 'key' | 'order'>) => {
        const key = newEventType.label.toLowerCase().replace(/\s+/g, '-');
        const order = Math.max(...eventTypes.map(et => et.order)) + 1;

        setEventTypes(prev => [...prev, { ...newEventType, key, order }]);
    };

    const updateEventType = (key: string, updates: Partial<Omit<EventType, 'key'>>) => {
        setEventTypes(prev =>
            prev.map(et => et.key === key ? { ...et, ...updates } : et)
        );
    };

    const deleteEventType = (key: string) => {
        setEventTypes(prev => prev.filter(et => et.key !== key));
    };

    const reorderEventTypes = (newOrder: EventType[]) => {
        const reorderedTypes = newOrder.map((eventType, index) => ({
            ...eventType,
            order: index
        }));
        setEventTypes(reorderedTypes);
    };

    const resetToDefaults = () => {
        setEventTypes(DEFAULT_EVENT_TYPES);
    };

    return (
        <EventTypesContext.Provider value={{
            eventTypes: eventTypes.sort((a, b) => a.order - b.order),
            addEventType,
            updateEventType,
            deleteEventType,
            reorderEventTypes,
            resetToDefaults
        }}>
            {children}
        </EventTypesContext.Provider>
    );
};