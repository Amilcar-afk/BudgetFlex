import React, { useState } from 'react';
import { Datepicker } from 'flowbite-react';

export function ModalCreateExpense({ open, onClose, onCreate }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('needs');
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newExpense = {
            id: Date.now(),
            name,
            price,
            category,
            date,
            description
        };
        onCreate(newExpense);
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
                                <input type="text" name="name" id="name" className="bg-gray-600 border border-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 text-white" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-white">Prix</label>
                                <input type="number" name="price" id="price" className="bg-gray-600 border border-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 text-white" value={price} onChange={(e) => setPrice(e.target.value)} required />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-white">Catégorie</label>
                                <select id="category" className="bg-gray-600 border border-gray-500 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 text-white" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="needs">Besoins</option>
                                    <option value="wants">Plaisirs</option>
                                    <option value="savings">Économies</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-white">Date</label>
                                <div className="dark-datepicker">
                                    <Datepicker
                                        selected={date}
                                        onChange={(date) => setDate(date)}
                                        weekStart={1}
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Description</label>
                                <textarea id="description" rows="4" className="block p-2.5 w-full text-sm bg-gray-600 rounded-lg border border-gray-500 focus:ring-primary-500 focus:border-primary-500 text-white" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <button type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                            Ajouter
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
