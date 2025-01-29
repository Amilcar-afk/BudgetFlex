import React, {useContext, useEffect, useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {ModalEditNeeds} from "../modal/ModalEditNeeds";
import NeedsIcon from "../category/NeedsIcon";
import {ExpensesContext} from "../../../../contexts/ExpensesContext";

export default function NeedsCard({ budgetData }) {
    const [openEditModal, setOpenEditModal] = useState(false);
    const { userExpenses } = useContext(ExpensesContext);

    const [categoryCounts, setCategoryCounts] = useState({
        needs: 0,
        wants: 0,
        saving: 0,
    });

    useEffect(() => {
        if (!userExpenses || !Array.isArray(userExpenses)) {
            console.warn("userExpenses is not available or not an array.");
            return;
        }

        const counts = userExpenses.reduce(
            (acc, expense) => {
                if (expense.category === 'needs') acc.needs += expense.price;
                return acc;
            },
            { needs: 0, wants: 0, saving: 0 }
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
                                <h3 className="mb-0">  {categoryCounts.needs}
                                    / {budgetData.needsCategory ? `${budgetData.needsCategory.toLocaleString()} €` : '4000 €'}</h3>
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
                    budgetMonth={budgetData || {}}
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                />
            )}
        </div>
    );
}
