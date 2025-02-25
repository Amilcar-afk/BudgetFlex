import React, {useContext, useEffect, useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {ModalEditWants} from "../modal/ModalEditWants";
import {ExpensesContext} from "../../../../contexts/ExpensesContext";
import CategoryIcon from "../category/CategoryIcon";

export default function WantsCard({ budgetData }) {
    const [openEditModal, setOpenEditModal] = useState(false);
    const { userExpenses } = useContext(ExpensesContext);

    const [categoryCounts, setCategoryCounts] = useState({
        wants: 0,
    });

    useEffect(() => {
        if (!userExpenses || !Array.isArray(userExpenses)) {
            console.warn("userExpenses is not available or not an array.");
            return;
        }

        const counts = userExpenses.reduce(
            (acc, expense) => {
                if (expense.category === 'wants') acc.wants += expense.price;
                return acc;
            },
            { wants: 0}
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
                    title="Modifier les envies"
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
                <h5 style={{fontSize: "larger"}}>Plaisirs</h5>
                <div className="card-container">
                    <div className="row">
                        <div /*className="col-8 col-sm-12 col-xl-8 my-auto"*/>
                            <div className="d-flex d-sm-block d-md-flex align-items-center">
                                <h3 className="mb-0">
                                    {categoryCounts.wants} / {budgetData.wantsCategory ? `${budgetData.wantsCategory.toLocaleString()} €` : '4000 €'}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <CategoryIcon classIcon={"bg-danger"}/>
                    </div>
                </div>
            </div>
            {openEditModal && (
                <ModalEditWants
                    budgetMonth={budgetData || {}}
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                />
            )}
        </div>
    );
}
