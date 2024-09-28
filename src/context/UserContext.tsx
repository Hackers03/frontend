// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
    userId: number | null;
    setUserId: (id: number | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<number | null>(null);

    // Exemple d'effet pour obtenir l'ID utilisateur au chargement
    useEffect(() => {
        // Supposons que nous avons une fonction pour obtenir l'utilisateur actuel
        const fetchUser = async () => {
            const response = await fetch('/api/current-user');
            const data = await response.json();
            setUserId(data.id);
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
