import React, {createContext, useState} from 'react';
import BudgetMonthApi from './api/BudgetMonthApi';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BudgetMonthContext = createContext(null);

const BudgetMonthProvider = ({ children }) => {
    const [activeBudgetMonth, setActiveBudgetMonth] = useState(null);
    const [currentBalance, setCurrentBalance] = useState(0);

    const addBudgetMonth = async (data) => {
        try{
            const response = await BudgetMonthApi.add(data);
            if (response.status === 200) {
                toast.success(`Votre budgetMonth a bien été enregistré`);
            }
        } catch (error) {
            console.error(error);
            toast.error(`Votre budgetMonth n'a pas été enregistré`);
        }
    }

    const editBudgetMonth = async (id, data) => {
        try{
            const response =  BudgetMonthApi.edit(id, data);
            if(response.status === 204){
                setActiveBudgetMonth((prevActiveBudgetMonth) =>
                    prevActiveBudgetMonth.map(budgetMonth => budgetMonth.id === id ? { ...budgetMonth, ...data } : budgetMonth)
                );
                toast.success(`Votre budgetMonth a bien été modifié`);
            }
        }catch(error){
            console.error(error);
            toast.error(`Votre budgetMonth n'a pas été modifié`);
        }
    }

    const getActiveBudgetMonth = async (userId) => {
        try {
            const response = await BudgetMonthApi.getLastActive(userId);
            if (response.status === 200) {
                setActiveBudgetMonth(response.data);
            } else {
                setActiveBudgetMonth('empty');
                toast.error(`Aucun budgetMonth actif trouvé`);
            }
        } catch (error) {
            console.error('Error fetching active budget month:', error);
            setActiveBudgetMonth(null);
        }
    }


    /*const getUserBudgetMonths = async (userId) => {
        return BudgetMonthApi.getUserList(userId).then(response => {
        }).catch(error => {
            toast.success(`Nous n'avons pas pu récupérer les budgetMonth `+ error);
        })
    }*/

    return (
        <BudgetMonthContext.Provider value={{ addBudgetMonth, getActiveBudgetMonth, activeBudgetMonth, currentBalance, setCurrentBalance, editBudgetMonth }}>
            <ToastContainer />
            {children}
        </BudgetMonthContext.Provider>
    )
}

export default BudgetMonthProvider;