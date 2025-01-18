import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {ModalEditNeeds} from "../modal/ModalEditNeeds";
import NeedsIcon from "../category/NeedsIcon";

export default function NeedsCard({ budgetData }) {
    const [openEditModal, setOpenEditModal] = useState(false);

    /* EVENTS FOR UPDATE SAVINGS */
    const handleEditClick = () => {
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    return (
        <div className="card">
            <div className="card-body">
                <button
                    className="btn"
                    title="Modifier les besoins"
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
                <h5 style={{fontSize: "larger"}}>Besoins</h5>
                <div className="card-container">
                    <div className="row">
                        <div /*className="col-8 col-sm-12 col-xl-8 my-auto"*/>
                            <div className="d-flex d-sm-block d-md-flex align-items-center">
                                <h3 className="mb-0">8 039 €
                                    / {budgetData ? `${budgetData.needsCategory.toLocaleString()} €` : '4000 €'}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <NeedsIcon/>
                    </div>
                </div>
            </div>
            {openEditModal && (
                <ModalEditNeeds
                    budgetMonthId={budgetData.id}
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                />
            )}
        </div>
    );
}
