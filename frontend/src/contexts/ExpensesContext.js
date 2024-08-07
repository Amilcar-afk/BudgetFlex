import React, {createContext, useState} from 'react';
import ExpensesApi from './api/ExpensesApi';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ExpensesContext = createContext(null);

const ExpensesProvider = ({ children }) => {
    const [userExpenses, setUserExpenses] = useState(null);

    const addExpenses = async (data) => {
        try{
            console.log(data)
            const response = await ExpensesApi.add(data);
            if (response.status === 201) {
                toast.success(`Votre dépense a bien été enregistré`);
            }
            return response;
        } catch (error) {
            console.error(error);
            toast.error(`Votre dépense n'a pas été enregistré`);
        }
    }

    const editExpenses = async (id, data) => {
        try{
            const response =  ExpensesApi.edit(id, data);
            if(response.status === 204){
                toast.success(`Votre dépense a bien été modifié`);
            }
            return response;
        }catch(error){
            console.error(error);
            toast.error(`Votre dépense n'a pas été modifié`);
        }
    }

    const deleteExpenses = async (id) => {
        try{
            const response = await ExpensesApi.delete(id);
            if(response.status === 204){
                toast.success(`Votre dépense a bien été supprimé`);
            }
            return response;
        }catch(error){
            console.error(error);
            toast.error(`Votre dépense n'a pas été supprimé`);
        }
    }

    const getUserExpenses = async (budgetMonthId) => {
        try {
            const response = await ExpensesApi.getBudgetMonthExpenses(budgetMonthId);
            if (response.status === 200) {
                setUserExpenses(response.data);
            } else {
                setUserExpenses('empty');
                toast.error(`Aucune dépense trouvée`);
            }
        } catch (error) {
            console.error('Error fetching user expenses:', error);
            setUserExpenses(null);
        }
    };

    return (
        <ExpensesContext.Provider value={{ addExpenses, getUserExpenses, userExpenses, deleteExpenses }}>
            <ToastContainer />
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesProvider;