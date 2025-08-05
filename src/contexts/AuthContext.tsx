// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { account } from '../lib/appwrite';
// import { Models, ID } from 'appwrite';

// interface AuthContextType {
//     user: Models.User<Models.Preferences> | null;
//     login: (email: string, password: string) => Promise<Models.User<Models.Preferences>>;
//     register: (email: string, password: string, name: string) => Promise<Models.User<Models.Preferences>>;
//     logout: () => Promise<void>;
//     loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = (): AuthContextType => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

// interface AuthProviderProps {
//     children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//     const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         checkUser();
//     }, []);

//     const checkUser = async (): Promise<void> => {
//         try {
//             const userData = await account.get();
//             setUser(userData);
//         } catch (error) {
//             console.log('Ingen bruker logget inn');
//             console.error('Error fetching user:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

// const login = async (email: string, password: string): Promise<Models.User<Models.Preferences>> => {
//     try {
//         // For Appwrite 18.x - bruk createEmailPasswordSession
//         await account.createEmailPasswordSession(email, password);
//         const userData = await account.get();
//         setUser(userData);
//         return userData;
//     } catch (error) {
//         console.error('Login error:', error);
//         throw error;
//     }
// };

// const register = async (email: string, password: string, name: string): Promise<Models.User<Models.Preferences>> => {
//     try {
//         await account.create(ID.unique(), email, password, name);
//         return await login(email, password);
//     } catch (error) {
//         // Custom feilmelding
//         throw new Error(`Registrering feilet: ${error instanceof Error ? error.message : 'Ukjent feil'}`);
//     }
// };

// const logout = async (): Promise<void> => {
//     try {
//         await account.deleteSession('current');
//         setUser(null);
//     } catch (error) {
//         // Gjør noe nyttig - f.eks. logg feilen men fjern bruker likevel
//         console.error('Logout failed:', error);
//         setUser(null); // Fjern bruker fra state uansett
//         // Ikke throw error - vi vil at logout skal "fungere" uansett
//     }
// };

//     const value: AuthContextType = {
//         user,
//         login,
//         register,
//         logout,
//         loading
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
