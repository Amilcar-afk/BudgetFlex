import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../../../../contexts/ExpensesContext";

const pieParams = { height: 250, margin: { right: 5 } };

export default function PieChartDetailsActual() {
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
                else if (expense.category === 'wants') acc.wants += expense.price;
                else if (expense.category === 'savings') acc.saving += expense.price;
                return acc;
            },
            { needs: 0, wants: 0, saving: 0 }
        );

        setCategoryCounts(counts);
    }, [userExpenses]);

    const data = [
        { value: categoryCounts.saving, color: "#00d25b" },
        { value: categoryCounts.needs, color: "#ffab00" },
        { value: categoryCounts.wants, color: "#fc424a" },
    ];

    return (
        <Box flexGrow={1}>
            <Typography textAlign="center">Actuel</Typography>
            <PieChart
                series={[
                    {
                        data: data,
                        cornerRadius: 0,
                        startAngle: -90,
                        endAngle: 270,
                        outerRadius: 90,
                    }
                ]}
                sx={{
                    '& path': {
                        stroke: 'none',
                        strokeWidth: 1,
                    }
                }}
                {...pieParams}
            />
        </Box>
    );
}
