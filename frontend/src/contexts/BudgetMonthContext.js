import React, { createContext } from 'react';
import BudgetMonthApi from './api/BudgetMonthApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BudgetMonthContext = createContext(null);

const BudgetMonthProvider = ({ children }) => {

    const addBudgetMonth = async (id) => {
        return BudgetMonthApi.add(id).then(response => {
            toast.success(`Votre budgetMonth a bien été enregistré`);
        }).catch(error => {
            console.error(error);
            toast.error(`Votre budgetMonth n'a pas été enregistré`);
        });
    };

    const getUserBudgetMonths = async (userId) => {
        return BudgetMonthApi.getUserList(userId).then(response => {
        }).catch(error => {
            toast.success(`Nous n'avons pas pu récupérer les budgetMonth `+ error);
        })
    }

    return (
        <BudgetMonthContext.Provider value={{ addBudgetMonth, getUserBudgetMonths }}>
            <ToastContainer />
            {children}
        </BudgetMonthContext.Provider>
    )
}

export default BudgetMonthProvider;