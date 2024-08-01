import React, {useContext, useEffect} from 'react';
import Widgets from './Widgets';
import {BudgetMonthContext} from "../../../contexts/BudgetMonthContext";

const MainPanel = () => {

    const { getActiveBudgetMonth } = useContext(BudgetMonthContext);

    useEffect(() => {
        getBudgetMonth().then(r => console.log("getBudgetMonth"));
    }, []);

    const getBudgetMonth = async () => {
        try {
            const response = await getActiveBudgetMonth(18);
            console.log("responseAc")
            console.log(response)
            if (response.status === 200) {
                console.log(response)
            } else {
                console.error('budget month not found');
            }
        } catch (error) {
            console.error('budget month error:', error);
        }
    };

    return (
        <div className="main-panel">
            <div className="bg-gray-800 content-wrapper">
                <Widgets />
            </div>
        </div>
    );
}

export default MainPanel;
