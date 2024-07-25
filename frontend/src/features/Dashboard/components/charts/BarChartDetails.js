import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { color } from '@mui/system';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const pieParams = { height: 200, margin: { right: 5 } };

export default function BarChartDetails() {
    return (
        <>
            <Box flexGrow={1}>
                <BarChart
                    series={[
                        { data: [8, 7, 4]},
                        { data: [4, 5, 6]},
                    ]}
   
                    height={300}
                    xAxis={[{
                        scaleType: 'band',
                        data: ['BESOINS', 'PLAISIRS', 'ECONOMIES'],
                        categoryGapRatio: 0.1,
                        barGapRatio: 0.1
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
                            fontWeight:"800 !important",
                        },
        
                        '& .MuiChartsAxis-line': {
                            stroke: "white !important",
                        },
        
                    }}
                />
            </Box>
        </>
    );
}