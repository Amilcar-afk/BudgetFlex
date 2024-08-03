import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NeedsIcon from "../category/NeedsIcon";
import WantsIcon from "../category/WantsIcon";
import SavingIcon from "../category/SavingIcon";
import { ModalDeleteExpenses } from "../modal/ModalDeleteExpenses";
import { ModalUpdateExpenses } from "../modal/ModalUpdateExpenses";

export default function ExpensesTable({ Expenses }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const handleDeleteClick = (expense) => {
        setSelectedExpense(expense);
        setOpenDeleteModal(true);
    };

    const handleUpdateClick = (expense) => {
        setSelectedExpense(expense);
        setOpenUpdateModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setSelectedExpense(null);
    };

    const handleCloseUpdateModal = () => {
        setOpenUpdateModal(false);
        setSelectedExpense(null);
    };

    const handleConfirmDelete = () => {
        console.log('Expense deleted:', selectedExpense.id);
        setOpenDeleteModal(false);
    };

    const handleConfirmUpdate = (id) => {
        console.log('Expense updated:', id);
        setOpenUpdateModal(false);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Suivi des dépenses</h4>
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
                                        <button className="btn" title="Modifier" onClick={() => handleUpdateClick(expense)}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className="btn" title="Supprimer" onClick={() => handleDeleteClick(expense)}>
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
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
            />
            {selectedExpense && (
                <ModalUpdateExpenses
                    open={openUpdateModal}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleConfirmUpdate}
                    expense={selectedExpense}
                />
            )}
        </div>
    );
}
