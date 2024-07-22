import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
    { value: 10, color: '#00d25b'},
    { value: 70, color: "#ffab00" },
    { value: 20, color: "#fc424a" },
];

export default function PieChartForSubCategory() {
    return (
        <PieChart
            series={[
                {
                    data: data,
                    innerRadius: 70,
                    outerRadius: 120,
                    paddingAngle: 5,
                    cornerRadius: 2,
                    startAngle: -90,
                    endAngle: 270,
                    cx: 150,
                    cy: 150,
                }
            ]}
            sx={{
                '& path': {
                    stroke: 'none',
                    strokeWidth: 1,
                }
            }}
            height={300}
        />

    );
}