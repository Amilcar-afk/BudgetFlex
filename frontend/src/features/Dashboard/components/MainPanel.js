import React, {useContext, useEffect} from 'react';
import Widgets from './Widgets';
import {BudgetMonthContext} from "../../../contexts/BudgetMonthContext";
import {AuthContext} from "../../../contexts/AuthContext";
import { Spinner } from "flowbite-react";
import ArchiveButton from "./ArchiveButton";
import NoActiveBudget from "./NoActiveBudget";

const MainPanel = () => {

    const { getActiveBudgetMonth, activeBudgetMonth } = useContext(BudgetMonthContext);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        if(!currentUser)
            getActiveBudgetMonth();
    }, [currentUser]);

    return (
        <div className="main-panel">
            <div className="bg-gray-800 content-wrapper">
                {activeBudgetMonth === null ? (
                    <div className="flex justify-center items-center h-screen">
                        <Spinner size="xl" aria-label="Spinner Loading spinner" />
                    </div>
                ) : (
                    activeBudgetMonth !== "empty" ? (
                        <>
                            <Widgets budgetData={activeBudgetMonth}/>
                            <ArchiveButton/>
                        </>
                    ) : (
                        <NoActiveBudget />
                    )
                )}
            </div>
        </div>
    );
}

export default MainPanel;
