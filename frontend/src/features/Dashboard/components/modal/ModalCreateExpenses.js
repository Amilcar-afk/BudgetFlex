import React, {useContext, useState, useRef} from 'react';
import DatePicker from 'react-datepicker';
import {ExpensesContext} from "../../../../contexts/ExpensesContext";

const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

export function ModalCreateExpense({ open, onClose, onCreate, budgetMonthId }) {
    const { addExpenses } = useContext(ExpensesContext);
    const [newExpenses, setNewExpenses] = useState({
        name: '',
        price: 0.0,
        category: 'needs',
        date: new Date(),
        budgetMonth: budgetMonthId,
    });
    const [selectedDate, setSelectedDate] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = formatDate(selectedDate);
        const expenseToSubmit = {
            ...newExpenses,
            date: formattedDate,
            price: parseFloat(newExpenses.price),
        };

        const response = await addExpenses(expenseToSubmit);

        if (response.status === 201) {
            onCreate(expenseToSubmit);
        }
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewExpenses((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative rounded-lg shadow bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t border-gray-600">
                        <h3 className="text-lg font-semibold text-white">
                            Créer une dépense
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Fermer la modal</span>
                        </button>
                    </div>
                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Nom</label>
                                <input type="text" name="name" id="name" className="bg-gray-600 border border-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 text-white" value={newExpenses.name} onChange={handleChange} required />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-white">Prix</label>
                                <input type="number" name="price" id="price" className="bg-gray-600 border border-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 text-white" value={newExpenses.price} onChange={handleChange} required />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-white">Catégorie</label>
                                <select name="category" id="category"
                                        className="bg-gray-600 border border-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 text-white"
                                        value={newExpenses.category} onChange={handleChange}>
                                    <option value="needs">Besoins</option>
                                    <option value="wants">Plaisirs</option>
                                    <option value="savings">Économies</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-white">Date</label>
                                <div className="dark-datepicker">
                                    <DatePicker
                                        onChange={handleDateChange}
                                    />
                                    {selectedDate && (
                                        <div>
                                            Date sélectionnée : {selectedDate.toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                            Créer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
