import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../../../../contexts/ExpensesContext";


export default function PieChartForSubCategory() {

    const { userExpenses } = useContext(ExpensesContext);

    const [SubCategoryCounts, setSubCategoryCounts] = useState({
        hobbies: 0,
        various: 0,
        health: 0,
        housing: 0,
        insurance: 0,
        feed: 0,
        transportation: 0,
        thrift: 0,
    });

    useEffect(() => {
        if (!userExpenses || !Array.isArray(userExpenses)) {
            console.warn("userExpenses is not available or not an array.");
            return;
        }

        const counts = userExpenses.reduce(
            (acc, expense) => {
                if (expense.subCategory === 'hobbies') acc.hobbies += expense.price;
                else if (expense.subCategory === 'various') acc.various += expense.price;
                else if (expense.subCategory === 'health') acc.health += expense.price;
                else if (expense.subCategory === 'housing') acc.housing += expense.price;
                else if (expense.subCategory === 'insurance') acc.insurance += expense.price;
                else if (expense.subCategory === 'feed') acc.feed += expense.price;
                else if (expense.subCategory === 'transportation') acc.transportation += expense.price;
                else if (expense.subCategory === 'thrift') acc.thrift += expense.price;

                return acc;
            },
            {
                hobbies: 0,
                various: 0,
                health: 0,
                housing: 0,
                insurance: 0,
                feed: 0,
                transportation: 0,
                thrift: 0
            }
        );

        setSubCategoryCounts(counts);
    }, [userExpenses]);

    const data = [
        { value: SubCategoryCounts.hobbies, color: '#7e0000'}, //loisirs
        { value: SubCategoryCounts.various, color: "#8a7a7a" }, //divers
        { value: SubCategoryCounts.health, color: "#ff33af" }, //santé
        { value: SubCategoryCounts.housing, color: "#e4eaec" }, //logement
        { value: SubCategoryCounts.insurance, color: "#e77834" }, //assurance
        { value: SubCategoryCounts.feed, color: "#e7d734" }, //alimentation
        { value: SubCategoryCounts.transportation, color: "#ff5733" }, //transport
        { value: SubCategoryCounts.thrift, color: "#8f5fe8" }, //epargne
    ];

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
                    cx: 115,
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