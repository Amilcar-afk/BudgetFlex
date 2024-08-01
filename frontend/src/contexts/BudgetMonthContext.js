import React, { createContext } from 'react';
import BudgetMonthApi from './api/BudgetMonthApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BudgetMonthContext = createContext(null);

const BudgetMonthProvider = ({ children }) => {

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
                toast.success(`Votre budgetMonth a bien été modifié`);
            }
        }catch(error){
            console.error(error);
            toast.error(`Votre budgetMonth n'a pas été modifié`);
        }
    }

    const getActiveBudgetMonth = async (userId) => {
        try{
            const response =  await BudgetMonthApi.getLastActive(userId);
            if(response && response.status === 200) {
                return response;
            } else {
                console.error('No active budget month found or invalid response structure');
                return null;
            }
        } catch (error) {
            console.error('Error fetching active budget month:', error);
            return null;
        }
    }

    /*const getUserBudgetMonths = async (userId) => {
        return BudgetMonthApi.getUserList(userId).then(response => {
        }).catch(error => {
            toast.success(`Nous n'avons pas pu récupérer les budgetMonth `+ error);
        })
    }*/

    return (
        <BudgetMonthContext.Provider value={{ addBudgetMonth, getActiveBudgetMonth }}>
            <ToastContainer />
            {children}
        </BudgetMonthContext.Provider>
    )
}

export default BudgetMonthProvider;