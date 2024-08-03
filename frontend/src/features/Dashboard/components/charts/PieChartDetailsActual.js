import * as React from 'react';

import {pieArcLabelClasses, PieChart} from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const data = [
    { value: 30, color: '#ff0fbb', tag: 'besoins'},
    { value: 70, color: "#a10c34", tag: 'économies' },
    { value: 25, color: "#20b5d8", tag: 'Plaisirs' },
];

const pieParams = { height: 250, margin: { right: 5 } };

export default function PieChartDetailsActual() {
    return (
        <>
            <Box flexGrow={1}>
                <Typography className={"typo-title"}>Actuel</Typography>
                <PieChart
                    series={[
                        {
                            data: data,
                            cornerRadius: 5,
                            startAngle: -90,
                            endAngle: 270,
                            arcLabel: (item) => `${item.tag}`,
                        }
                    ]}
                    sx={{
                        '& path': {
                            stroke: 'none',
                            strokeWidth: 1,
                        },
                        [`& .${pieArcLabelClasses.root}`]: {
                            fill: 'white',
                            fontWeight: 'bold',
                        },
                    }}

                    {...pieParams}

                    pieLabel={(item, context) => {
                        if ((item.value ?? 0) > 10) {
                            return item.value;
                        }
                        return context.bar.height < 60 ? null : item.value?.toString();
                    }}
                />
            </Box>  
        </>
    );
}