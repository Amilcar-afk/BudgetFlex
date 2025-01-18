import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SavingIcon from "../category/SavingIcon";
import { ModalEditSaving } from "../modal/ModalEditSaving";

export default function SavingCard({ budgetData }) {
    const [openEditModal, setOpenEditModal] = useState(false);

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
                                    2 039 € / {budgetData ? `${budgetData.savingCategory.toLocaleString()} €` : '6000 €'}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <SavingIcon />
                    </div>
                </div>
            </div>
            {openEditModal && (
                <ModalEditSaving
                    budgetMonthId={budgetData.id}
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                />
            )}
        </div>
    );
}
