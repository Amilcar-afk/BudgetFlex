import React, {useContext, useEffect, useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ModalEditSaving } from "../modal/ModalEditSaving";
import {ExpensesContext} from "../../../../contexts/ExpensesContext";
import CategoryIcon from "../category/CategoryIcon";

export default function SavingCard({ budgetData }) {
    const [openEditModal, setOpenEditModal] = useState(false);
    const { userExpenses } = useContext(ExpensesContext);

    const [categoryCounts, setCategoryCounts] = useState({
        saving: 0
    });

    useEffect(() => {
        if (!userExpenses || !Array.isArray(userExpenses)) {
            console.warn("userExpenses is not available or not an array.");
            return;
        }

        const counts = userExpenses.reduce(
            (acc, expense) => {
                if (expense.category === 'savings') acc.saving += expense.price;
                return acc;
            },
            { saving: 0 }
        );

        setCategoryCounts(counts);
    }, [userExpenses, budgetData]);

    /* EVENTS FOR UPDATE SAVINGS */
    const handleEditClick = () => {
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    return (
        <div className="card" style={{ position: "relative" }}>
            {/* Bouton pour ouvrir le modal d'édition */}
            <button
                className="btn"
                title="Modifier les économies"
                onClick={handleEditClick}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                }}
            >
                <i
                    className="fas fa-pencil-alt"
                    style={{
                        cursor: "pointer",
                    }}
                ></i>
            </button>

            <div className="card-body">
                <h5 style={{ fontSize: "larger" }}>Economies</h5>
                <div className="card-container">
                    <div className="row">
                        <div>
                            <div className="d-flex d-sm-block d-md-flex align-items-center">
                                <h3 className="mb-0">
                                    {categoryCounts.saving} / {budgetData.savingCategory ? `${budgetData.savingCategory.toLocaleString()} €` : '6000 €'}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <CategoryIcon classIcon={"bg-success"} />
                    </div>
                </div>
            </div>
            {openEditModal && (
                <ModalEditSaving
                    budgetMonth={budgetData || {}}
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                />
            )}
        </div>
    );
}
