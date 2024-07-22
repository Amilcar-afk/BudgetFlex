import * as React from 'react';
import PieChartDetailsActual from "./PieChartDetailsActual";
import PieChartDetailsStart from "./PieChartDetailsStart";
import BarChartDetails from "./BarChartDetails";
import Stack from '@mui/material/Stack';
export default function CategoryDetails() {
    return (
        <div className="col-12 grid-margin">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Détails</h4>
                    <Stack className="charts-container" direction="row" width="100%" textAlign="center" spacing={2}>
                        <div className="col-sm-4 grid-margin">
                            <PieChartDetailsStart />
                        </div>
                        <div className="col-sm-4 grid-margin">
                            <BarChartDetails />
                        </div>
                        <div className="col-sm-4 grid-margin">
                            <PieChartDetailsActual />
                        </div>
                    </Stack>
                </div>
            </div>
        </div>
    );
}
