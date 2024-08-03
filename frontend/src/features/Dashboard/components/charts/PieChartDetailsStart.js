import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';


const data = [
    { value: 10},
    { value: 70 },
    { value: 20},
];

const pieParams = { height: 250, margin: { right: 5 } };

export default function PieChartDetailsStart() {
    return (
        <>
            <Box flexGrow={1}>
                <Typography>Départ</Typography>
                <PieChart
                    PieLabel={(item, context) => {
                        if ((item.value ?? 0) > 10) {
                            return item.value;
                        }
                        return context.bar.height < 60 ? null : item.value?.toString();
                    }}
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
                            alignItems:"center",
                        }
                    }}
                    {...pieParams}
                />
            </Box>
        </>

    );
}