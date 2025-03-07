import React, {useContext, useState} from 'react';
import { BudgetMonthContext } from "../../../../contexts/BudgetMonthContext";
import {useNavigate} from "react-router-dom";

export function ModalClassifiedBudgetMonth({ open, onClose }) {
    const [selectedMonth, setSelectedMonth] = useState("janvier");
    const [selectedYear, setSelectedYear] = useState("2025");
    const { editBudgetMonth, activeBudgetMonth } = useContext(BudgetMonthContext);
    const navigate = useNavigate();

    const handleMonthChange = (e) => {
        const { value } = e.target;
        setSelectedMonth(value);
    };

    const handleYearChange = (e) => {
        const { value } = e.target;
        setSelectedYear(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const budgetMonthToSubmit = {
            month: selectedMonth,
            year: selectedYear,
            state: "classified"
        };
        const responseCode = await editBudgetMonth(activeBudgetMonth.id, budgetMonthToSubmit);
        if (responseCode === 204) {
            navigate('/dashboard');
        } else {
            console.error('Login failed');
        }
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative rounded-lg shadow bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t border-gray-600">
                        <h3 className="text-lg font-semibold text-white">
                            Archiver ce mois de budget
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={onClose}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 grid-cols-2">

                            <div className="col-span-2">
                                <select name="month" id="monthSelect"
                                        className="bg-gray-600 border border-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 text-white"
                                        value={selectedMonth} onChange={handleMonthChange}>
                                    <option value="01">Janvier</option>
                                    <option value="02">Février</option>
                                    <option value="03">Mars</option>
                                    <option value="04">Avril</option>
                                    <option value="05">Mai</option>
                                    <option value="06">Juin</option>
                                    <option value="07">Juillet</option>
                                    <option value="08">Août</option>
                                    <option value="09">Septembre</option>
                                    <option value="10">Octobre</option>
                                    <option value="11">Novembre</option>
                                    <option value="12">Décembre</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <select name="year" id="yearSelect"
                                        className="bg-gray-600 border border-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 text-white"
                                        value={selectedYear} onChange={handleYearChange}>
                                    <option value="2016">2016</option>
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                            Archiver
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
