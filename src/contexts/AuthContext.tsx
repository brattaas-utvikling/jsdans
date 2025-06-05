import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { account } from '../lib/appwrite';
import { Models } from 'appwrite';

interface AuthContextType {
    user: Models.User<Models.Preferences> | null;
    login: (email: string, password: string) => Promise<Models.User<Models.Preferences>>;
    register: (email: string, password: string, name: string) => Promise<Models.User<Models.Preferences>>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async (): Promise<void> => {
        try {
            const userData = await account.get();
            setUser(userData);
        } catch (error) {
            console.log('Ingen bruker logget inn');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<Models.User<Models.Preferences>> => {
        try {
            await account.createEmailSession(email, password);
            const userData = await account.get();
            setUser(userData);
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const register = async (email: string, password: string, name: string): Promise<Models.User<Models.Preferences>> => {
        try {
            await account.create('unique()', email, password, name);
            return await login(email, password);
        } catch (error) {
            throw error;
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};