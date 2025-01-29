import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../../../../contexts/ExpensesContext";

export default function BarChartDetails({ budgetData }) {
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

        console.log(budgetData.needsCategory);

        const counts = userExpenses.reduce(
            (acc, expense) => {
                if (expense.category === 'needs') acc.needs += expense.price;
                else if (expense.category === 'wants') acc.wants += expense.price;
                else if (expense.category === 'savings') acc.saving += expense.price;
                return acc;
            },
            { needs: 0, wants: 0, saving: 0 }
        );

        setCategoryCounts(counts);
    }, [userExpenses, budgetData]);

    const params = [
        { data: [categoryCounts.needs, categoryCounts.wants, categoryCounts.saving]},
        { data: [budgetData?.needsCategory, budgetData?.wantsCategory, budgetData?.savingCategory]},
    ];

    return (
        <>
            <Box flexGrow={1}>
                <BarChart
                    series={params}
   
                    height={300}
                    xAxis={[{
                        scaleType: 'band',
                        data: ['BESOINS', 'PLAISIRS', 'ECONO']
                    }]}

                    /*barLabel={(item, context) => {
                        if ((item.value ?? 0) > 10) {
                            return item.value;
                        }
                        return context.bar.height < 60 ? "null" : item.value?.toString();
                    }}*/
        
                    sx={{
                        '& .MuiChartsAxis-tickLabel': {
                            fill: "white !important",
                        },


                    }}
                />
            </Box>
        </>
    );
}