import React, {useContext, useEffect} from 'react';
import Widgets from './Widgets';
import {BudgetMonthContext} from "../../../contexts/BudgetMonthContext";
import { Spinner } from "flowbite-react";

const MainPanel = () => {

    const { getActiveBudgetMonth, activeBudgetMonth } = useContext(BudgetMonthContext)

    useEffect(() => {
        getActiveBudgetMonth(18);
        console.log("useEffect")
    }, []);

    return (
        <div className="main-panel">
            <div className="bg-gray-800 content-wrapper">
                {activeBudgetMonth === null ? (
                    <div className="flex justify-center items-center h-screen">
                        <Spinner size="xl" aria-label="Spinner Loading spinner" />
                    </div>
                ) : (
                    activeBudgetMonth ? (
                        <Widgets budgetData={activeBudgetMonth} />
                    ) : (
                        <NoActiveBudget />
                    )
                )}
            </div>
        </div>
    );
}

const NoActiveBudget = () => (
    <div className="no-active-budget">
        <h2>Aucun budget actif trouvé</h2>
        <p>Il semble que vous n'ayez pas de budget actif actuellement.</p>
    </div>
);

export default MainPanel;
