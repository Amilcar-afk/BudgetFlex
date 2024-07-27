// authContext.js
import React, { createContext, useEffect, useState } from 'react';
import authApi from './api/authApi';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [csrfToken, setCsrfToken] = useState(null);

    /*useEffect(() => {

    }, []);*/

    const register = async (user) => {
        try {
            const registeredUser = await authApi.register(user);
            setCurrentUser(registeredUser);
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

    const fetchCsrfToken = async () => {
        try {
            const tokenData = await authApi.getCsrfToken();
            console.log(tokenData.csrfToken)
            setCsrfToken(tokenData.csrfToken);
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, register, login, logout, fetchCsrfToken, csrfToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
