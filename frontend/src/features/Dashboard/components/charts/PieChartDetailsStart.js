import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';


const data = [
    { value: 10, color: '#00d25b'},
    { value: 70, color: "#ffab00" },
    { value: 20, color: "#fc424a" },
];

const pieParams = { height: 250, margin: { right: 5 } };

export default function PieChartDetailsStart() {
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