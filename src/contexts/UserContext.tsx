import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'author' | 'editor' | 'user';

interface UserContextType {
    role: UserRole;
    setRole: (role: UserRole) => void;
    login: (role: UserRole) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [role, setRole] = useState<UserRole>('user');

    const login = (role: UserRole) => {
        setRole(role);
    };

    const logout = () => {
        setRole('user');  // Reset to default or guest role
    };

    return (
        <UserContext.Provider value={{ role, setRole, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

