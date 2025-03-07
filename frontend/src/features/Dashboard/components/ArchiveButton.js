import React, {useContext, useEffect, useState} from 'react';
import {ModalDeleteExpenses} from "./modal/ModalDeleteExpenses";
import {ModalClassifiedBudgetMonth} from "./modal/ModalClassifiedBudgetMonth";

const ArchiveButton = () => {
    const [handleClassifiedModal, setHandleClassifiedModal] = useState(false);

    const handleCloseClassifiedModal = () => {
        setHandleClassifiedModal(false);
    };

    const handleConfirmClassifiedModal = async () => {

    };

    return (
        <>
            <button
                onClick={() => setHandleClassifiedModal(true)}
                className="archive-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                Archiver
            </button>
            <ModalClassifiedBudgetMonth
                open={handleClassifiedModal}
                onClose={handleCloseClassifiedModal}
                onConfirm={handleConfirmClassifiedModal}
            />
        </>
    );
};

export default ArchiveButton;