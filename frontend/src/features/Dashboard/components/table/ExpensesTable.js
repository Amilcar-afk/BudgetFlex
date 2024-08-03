import * as React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NeedsIcon from "../category/NeedsIcon";
import WantsIcon from "../category/WantsIcon";
import SavingIcon from "../category/SavingIcon";
import {useContext, useEffect, useState} from "react";
import {ModalDeleteExpenses} from "../modal/ModalDeleteExpenses";

export default function ExpensesTable({ Expenses }) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedExpenseId, setSelectedExpenseId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedExpenseId(id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedExpenseId(null);
    };

    const handleConfirmDelete = () => {
        // Ajoutez ici la logique pour supprimer la dépense avec l'ID `selectedExpenseId`
        console.log('Expense deleted:', selectedExpenseId);
        setOpenModal(false);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Suivie des dépenses</h4>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>
                                <div className="form-check form-check-muted m-0">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" />
                                    </label>
                                </div>
                            </th>
                            <th>Date</th>
                            <th>Nom</th>
                            <th>Montant</th>
                            <th>Sous-catégorie</th>
                            <th>Catégorie</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Expenses && Expenses.length > 0 ? (
                            Expenses.map((expense) => (
                                <tr key={expense.id}>
                                    <td>
                                        <div className="form-check form-check-muted m-0">
                                            <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" />
                                            </label>
                                        </div>
                                    </td>
                                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                                    <td>{expense.name}</td>
                                    <td>{expense.price} €</td>
                                    <td>{expense.subCategory}</td>
                                    <td>
                                        {expense.category === 'needs' && <NeedsIcon />}
                                        {expense.category === 'wants' && <WantsIcon />}
                                        {expense.category === 'savings' && <SavingIcon />}
                                    </td>
                                    <td>
                                        <button className="btn" title="Modifier">
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className="btn" title="Supprimer" onClick={() => handleDeleteClick(expense.id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Aucune dépense trouvée</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalDeleteExpenses
                open={openModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}