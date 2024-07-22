import * as React from 'react';

import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const data = [
    { value: 10, color: '#00d25b'},
    { value: 70, color: "#ffab00" },
    { value: 20, color: "#fc424a" },
];

const pieParams = { height: 250, margin: { right: 5 } };

export default function PieChartDetailsActual() {
    return (
        <>
            <Box flexGrow={1}>
                <Typography>Actuel</Typography>
                <PieChart
                    series={[
                        {
                            data: data,
                            cornerRadius: 0,
                            startAngle: -90,
                            endAngle: 270,
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
        </>
    );
}