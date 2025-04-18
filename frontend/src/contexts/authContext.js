import React, { createContext, useState } from 'react';
import AuthApi from './api/AuthApi';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const register = async (user) => {
        try {
            const response = await AuthApi.register(user);
            if (response && response.status === 201) {
               return response.status;
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await AuthApi.login(credentials);
            if (response && response.data.token && response.status === 200) {
                localStorage.setItem('jwtToken', response.data.token);
                setCurrentUser(response.data.user);
                return response.status;
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
        return false;
    };

    const logout = async () => {
        try {
            localStorage.removeItem('jwtToken');
            setCurrentUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, register, login, logout, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
