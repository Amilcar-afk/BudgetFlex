import React, {createContext, useState} from 'react';
import BudgetMonthApi from './api/BudgetMonthApi';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BudgetMonthContext = createContext(null);

const BudgetMonthProvider = ({ children }) => {
    const [activeBudgetMonth, setActiveBudgetMonth] = useState(null);
    const [currentBalance, setCurrentBalance] = useState(0);

    const addBudgetMonth = async (data) => {
        try{
            const response = await BudgetMonthApi.add(data);
            if (response.status === 201) {
                toast.success(`Votre budgetMonth a bien été enregistré`, {
                    theme: 'dark',
                });
            }
            return response;
        } catch (error) {
            console.error(error);
            toast.error(`Votre budgetMonth n'a pas été enregistré`, {
                theme: 'dark',
            });
        }
    }

    const editBudgetMonth = async (id, data) => {
        try{
            const response =  await BudgetMonthApi.edit(id, data);
            if (response.status === 204) {
                setActiveBudgetMonth((prevState) => {
                    const updatedState = {
                        ...prevState,
                        ...data,
                    };
                    toast.success("Modification pris en compte", {
                        theme: 'dark',
                    });
                    return updatedState;
                });
            }
        }catch(error){
            console.error(error);
            toast.error(`Erreur lors de la modification`, {
                theme: 'dark',
            });
        }
    }

    const getActiveBudgetMonth = async () => {
        try {
            const response = await BudgetMonthApi.getLastActive();
            setActiveBudgetMonth(response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setActiveBudgetMonth("empty");
            } else {
                console.error('Error fetching active budget month:', error);
                toast.error(`Erreur lors de la récupération du budget actif`, {
                    theme: 'dark',
                });
                setActiveBudgetMonth(null);
            }
        }
    }


    /*const getUserBudgetMonths = async (userId) => {
        return BudgetMonthApi.getUserList(userId).then(response => {
        }).catch(error => {
            toast.success(`Nous n'avons pas pu récupérer les budgetMonth `+ error);
        })
    }*/

    return (
        <BudgetMonthContext.Provider value={{ addBudgetMonth, getActiveBudgetMonth, activeBudgetMonth, currentBalance, setCurrentBalance, editBudgetMonth, setActiveBudgetMonth }}>
            {children}
        </BudgetMonthContext.Provider>
    )
}

export default BudgetMonthProvider;