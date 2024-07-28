import React, { createContext, useEffect, useState } from 'react';
import authApi from './api/authApi';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const register = async (user) => {
        try {
            const response = await authApi.register(user);
            if (response && response.status === 201) {
               return response.status;
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const login = async (credentials) => {
        try {
            const user = await authApi.login(credentials);
            setCurrentUser(user);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
            setCurrentUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
