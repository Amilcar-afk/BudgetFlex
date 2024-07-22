import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import {BarChart} from "@mui/x-charts";

export default function BarChartBankBalance() {
    return (
        <BarChart
            series={[
                {
                    data: [32123],
                },
                {
                    data: [8000],
                },
            ]}

            barLabel={(item, context) => {
                if ((item.value ?? 0) > 10) {
                    return item.value;
                }
                return context.bar.height < 60 ? null : item.value?.toString();
            }}

            sx={{
                '& .MuiChartsAxis-tickLabel': {
                    fill: "white !important",
                    fontWeight:"500 !important",
                },

                '& .MuiChartsAxis-line': {
                    stroke: "white !important",
                },



            }}

            height={300}
        />

    );
}