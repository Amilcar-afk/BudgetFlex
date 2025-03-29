import React, {useState} from "react";
import {ModalCreateBudgetMonth} from "./modal/ModalCreateBudgetMonth";

const NoActiveBudget = () => {

    const [openCreateModal, setOpenCreateModal] = useState(false);

    const handleCreateClick = () => {
        setOpenCreateModal(true);
    };


    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
    };

    return (

        <div className="no-active-budget">
            <h2>Aucun budget actif trouvé</h2>
            <p>Il semble que vous n'ayez pas de budget actif actuellement.</p>
            <button
                type="button"
                onClick={handleCreateClick}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Créer un nouveau budget
            </button>
            <ModalCreateBudgetMonth
                open={openCreateModal}
                onClose={handleCloseCreateModal}
            />
        </div>
    );
};

export default NoActiveBudget;