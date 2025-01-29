import * as React from 'react';
import PieChartDetailsActual from "./PieChartDetailsActual";
import PieChartDetailsStart from "./PieChartDetailsStart";
import BarChartDetails from "./BarChartDetails";
import Stack from '@mui/material/Stack';
export default function CategoryDetails({ budgetData }) {

    if (!budgetData) {
        return (
            <div className="no-budget-data">
                <h4>Aucune donnée de budget disponible</h4>
            </div>
        );
    }

    return (
        <div className="col-12 grid-margin">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Détails</h4>
                    <div className="row charts-container">
                        <div className="col-sm-4 grid-margin">
                            <PieChartDetailsStart budgetData={budgetData}/>
                        </div>
                        <div className="col-sm-4 grid-margin">
                            <BarChartDetails budgetData={budgetData}/>
                        </div>
                        <div className="col-sm-4 grid-margin">
                            <PieChartDetailsActual />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
