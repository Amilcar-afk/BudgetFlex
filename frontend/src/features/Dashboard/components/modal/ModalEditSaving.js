import React, {useContext, useEffect, useState} from 'react';
import { BudgetMonthContext } from "../../../../contexts/BudgetMonthContext";

export function ModalEditSaving({ open, onClose, budgetMonth }) {
    const { editBudgetMonth, activeBudgetMonth } = useContext(BudgetMonthContext);
    const [newAmount, setNewAmount] = useState(budgetMonth?.savingCategory || 0);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedData = { "savingCategory": parseFloat(newAmount) };
            await editBudgetMonth(budgetMonth.id, updatedData);
            onClose();
        } catch (error) {
            console.error("Error updating budget month:", error);
        }
    };

    const handleChange = (e) => {
        setNewAmount(e.target.value);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative rounded-lg shadow bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t border-gray-600">
                        <h3 className="text-lg font-semibold text-white">
                            Modifier le montant
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Fermer la modal</span>
                        </button>
                    </div>
                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div className="col-span-2 sm:col-span-1">
                            <label
                                htmlFor="savings"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                Montant
                            </label>
                            <input
                                type="number"
                                name="savings"
                                id="savings"
                                className="bg-gray-600 border border-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 text-white"
                                value={newAmount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            style={{marginTop: "15px"}}
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                        >
                            Mettre à jour
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
