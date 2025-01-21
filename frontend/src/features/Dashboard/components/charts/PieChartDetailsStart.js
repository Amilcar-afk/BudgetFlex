import * as React from 'react';

import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const pieParams = { height: 250, margin: { right: 5 } };

export default function PieChartDetailsStart({ budgetData }) {

    if (!budgetData) {
        return (
            <div>Chargement des données...</div>
        );
    }

    const data = [
        { value: budgetData.savingCategory || 0, color: '#00d25b' },
        { value: budgetData.needsCategory || 0, color: "#ffab00" },
        { value: budgetData.wantsCategory || 0, color: "#fc424a" },
    ];

    return (
        <>
            <Box flexGrow={1}>
                <Typography textAlign={"center"}>Départ</Typography>
                <PieChart
                    series={[
                        {
                            data: data,
                            cornerRadius: 0,
                            startAngle: -90,
                            endAngle: 270,
                            outerRadius: 90,
                        },
                    ]}
                    sx={{
                        '& path': {
                            stroke: 'none',
                            strokeWidth: 1,
                            alignItems:"center",
                        }
                    }}
                    {...pieParams}
                />
            </Box>
        </>

    );
}