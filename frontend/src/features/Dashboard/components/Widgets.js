import React, {useContext, useEffect, useState} from 'react';
import PieChartForSubCategory from "./charts/PieChartForSubCategory";
import BarChartBankBalance from "./charts/BarChartBankBalance";
import ExpensesTable from "../components/table/ExpensesTable";
import CategoryDetails from "./charts/CategoryDetails";
import { ExpensesContext } from "../../../contexts/ExpensesContext";
import SavingCard from "./card/SavingCard";
import WantsCard from "./card/WantsCard";
import NeedsCard from "./card/NeedsCard";

const Widgets = ({ budgetData }) => {
    const { getUserExpenses, userExpenses } = useContext(ExpensesContext);
    const [currentBalance, setCurrentBalance] = useState(0);

    // calculate all the expenses
    const calculateTotalExpenses = (expenses) => {
        return expenses.reduce((total, expense) => total + expense.price, 0);
    };

    useEffect(() => {
        if (budgetData && budgetData.id) {
            getUserExpenses(budgetData.id);
        }
    }, []);

    useEffect(() => {
        if (budgetData && userExpenses) {
            const totalExpenses = calculateTotalExpenses(userExpenses);
            const updatedBalance = budgetData.initialBudget - totalExpenses;
            setCurrentBalance(updatedBalance);
        }
    }, [budgetData, userExpenses]);

    return (
        <>
        {/*<div className="d-flex align-items-center mb-4">
                <Button size="lg" className='appButton'>Terminer ce suivi</Button>
                <span className="ml-4"></span>
            </div>*/}
            <div className="row">
                <div className="col-sm-6 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h5>SOLDE DE DEPART</h5>
                            <div className="row">
                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                                        <h2 className="mb-0">{budgetData ? `${budgetData.initialBudget.toLocaleString()} €` : '0 €'}</h2>
                                        <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p>
                                    </div>
                                    <h6 className="text-muted font-weight-normal">11.38% Since last month</h6>
                                </div>
                                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                    <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h5>SOLDE ACTUEL</h5>
                            <div className="row">
                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                                        <h2 className="mb-0">{currentBalance ? `${currentBalance.toLocaleString()} €` : '0 €'}</h2>
                                        {/* Vous pouvez ajouter des indicateurs basés sur vos données */}
                                    </div>
                                    <h6 className="text-muted font-weight-normal">Mise à jour avec les dépenses</h6>
                                </div>
                                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                    <i className="icon-lg mdi mdi-monitor text-success ml-auto"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Transaction History</h4>
                            <BarChartBankBalance budgetData={budgetData} currentBalance={currentBalance ? currentBalance : 0}/>
                            <div
                                className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                                <div className="text-md-center text-xl-left">
                                    <h6 className="mb-1">Solde de Départ</h6>
                                </div>
                                <div
                                    className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                                    <h6 className="font-weight-bold mb-0">{budgetData ? `${budgetData.initialBudget.toLocaleString()} €` : '0 €'}</h6>
                                </div>
                            </div>
                            <div
                                className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                                <div className="text-md-center text-xl-left">
                                    <h6 className="mb-1">Solde Actuel</h6>
                                </div>
                                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                                    <h6 className="font-weight-bold mb-0">{currentBalance ? `${currentBalance.toLocaleString()} €` : '0 €'}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 grid-margin stretch-card">
                    <ExpensesTable budgetMonthId={budgetData.id}/>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-4 grid-margin">
                    <NeedsCard budgetData={budgetData}/>
                </div>
                <div className="col-sm-4 grid-margin">
                    <WantsCard budgetData={budgetData}/>
                </div>
                <div className="col-sm-4 grid-margin">
                    <SavingCard budgetData={budgetData}/>
                </div>
            </div>
            <div className="row">
                <CategoryDetails budgetData={budgetData}/>
            </div>
            <div className="row">
                <div className="col-md-6 col-xl-4 stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-row justify-content-between">
                                <h4 className="card-title mb-1">Sous-Catégories</h4>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="preview-list">
                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-loisirs">
                                                    <i className="mdi mdi-file-document"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Loisir</h6>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                </div>
                                            </div>
                                        </div>

                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-divers">
                                                    <i className="mdi mdi-file-document"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Divers</h6>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                </div>
                                            </div>
                                        </div>

                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-sante">
                                                    <i className="mdi mdi-file-document"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Santé</h6>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                </div>
                                            </div>
                                        </div>

                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-secondary">
                                                    <i className="mdi mdi-file-document"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Logement</h6>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                </div>
                                            </div>
                                        </div>

                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-assurance">
                                                    <i className="mdi mdi-file-document"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Assurances</h6>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                </div>
                                            </div>
                                        </div>

                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-alimentation">
                                                    <i className="mdi mdi-file-document"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Alimentation</h6>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                </div>
                                            </div>
                                        </div>

                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-transport">
                                                    <i className="mdi mdi-file-document"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Transport</h6>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                </div>
                                            </div>
                                        </div>

                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-info">
                                                    <i className="mdi mdi-clock"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Epargne</h6>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xl-4 stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Sous-catégories dépenses</h4>
                            <PieChartForSubCategory/>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-xl-4 stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">To do list</h4>
                            <div className="add-items d-flex">
                                <input type="text" className="form-control todo-list-input" placeholder="enter task.."/>
                                <button className="add btn btn-primary todo-list-add-btn">Add</button>
                            </div>
                            <div className="list-wrapper">
                                <ul className="d-flex flex-column-reverse text-white todo-list todo-list-custom">
                                    <li>
                                        <div className="form-check form-check-primary">
                                            <label className="form-check-label">
                                                <input className="checkbox" type="checkbox" /> Create invoice
                                            </label>
                                        </div>
                                        <i className="remove mdi mdi-close-box"></i>
                                    </li>
                                    <li>
                                        <div className="form-check form-check-primary">
                                            <label className="form-check-label">
                                                <input className="checkbox" type="checkbox" /> Meeting with Alita
                                            </label>
                                        </div>
                                        <i className="remove mdi mdi-close-box"></i>
                                    </li>
                                    <li className="completed">
                                        <div className="form-check form-check-primary">
                                            <label className="form-check-label">
                                                <input className="checkbox" type="checkbox" /> Prepare for presentation
                                            </label>
                                        </div>
                                        <i className="remove mdi mdi-close-box"></i>
                                    </li>
                                    <li>
                                        <div className="form-check form-check-primary">
                                            <label className="form-check-label">
                                                <input className="checkbox" type="checkbox" /> Plan weekend outing
                                            </label>
                                        </div>
                                        <i className="remove mdi mdi-close-box"></i>
                                    </li>
                                    <li>
                                        <div className="form-check form-check-primary">
                                            <label className="form-check-label">
                                                <input className="checkbox" type="checkbox" /> Pick up kids from school
                                            </label>
                                        </div>
                                        <i className="remove mdi mdi-close-box"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Widgets;
