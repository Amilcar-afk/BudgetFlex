import React, {createContext, useEffect, useState} from 'react';
import userApi from './api/userApi';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [userList, setUserList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [csrfToken, setCsrfToken] = useState(null);

    /*useEffect(() => {
        fetchUserList();
    }, []);*/

    const fetchUserList = async () => {
        try {
            const users = await userApi.getList();
            setUserList(users);
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    };

    const fetchUser = async (id) => {
        console.log("time")
        try {
            return await userApi.get(id);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const addUser = async (user) => {
        try {
            const newUser = await userApi.add(user);
            setUserList([...userList, newUser]);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const updateUser = async (id, user) => {
        try {
            const updatedUser = await userApi.update(id, user);
            setUserList(userList.map(u => (u.id === id ? updatedUser : u)));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            if (!csrfToken) {
                const token = await userApi.getCsrfTokenForDelete(id);
                setCsrfToken(token.csrfToken);
            }

            await userApi.delete(id, csrfToken);
            setUserList(userList.filter(u => u.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <UserContext.Provider value={{ userList, currentUser, addUser, fetchUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
