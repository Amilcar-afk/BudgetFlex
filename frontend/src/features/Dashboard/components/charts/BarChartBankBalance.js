import * as React from 'react';
import { BarChart } from "@mui/x-charts";

export default function BarChartBankBalance({ budgetData, currentBalance }) {
    return (
        <BarChart
            series={[
                {
                    data: [budgetData.initialBudget],
                },
                {
                    data: [currentBalance],
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
                    fontWeight: "500 !important",
                },
                '& .MuiChartsAxis-line': {
                    stroke: "white !important",
                },
            }}
            height={300}
        />
    );
}
