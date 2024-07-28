import React, {useContext, useEffect, useState} from 'react';
import PieChartForSubCategory from "./charts/PieChartForSubCategory";
import BarChartBankBalance from "./charts/BarChartBankBalance";
import ExpensesTable from "./table/ExpensesTable";
import SavingIcon from "./category/SavingIcon";
import WantsIcon from "./category/WantsIcon";
import NeedsIcon from "./category/NeedsIcon";
import CategoryDetails from "./charts/CategoryDetails";
import { Button } from "flowbite-react";
import { AuthContext } from '../../../contexts/authContext';
const Widgets = () => {

    const { register, fetchCsrfToken, csrfToken } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        firstname: 'test',
        lastname: 'test',
        email: 'blackoscapos@gmail.com',
        plainPassword: 'Zecazumickduca94',
        agreeTerms: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData({
            ...userData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchCsrfToken(); // Fetch the CSRF token before submitting the form
        register({ ...userData, _csrf_token: csrfToken }); // Include CSRF token in the payload
    };


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
                                        <h2 className="mb-0">32 123 €</h2>
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
                                        <h2 className="mb-0">2 039 €</h2>
                                        <p className="text-danger ml-2 mb-0 font-weight-medium">-2.1% </p>
                                    </div>
                                    <h6 className="text-muted font-weight-normal">2.27% Since last month</h6>
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
                            <BarChartBankBalance/>
                            <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                                <div className="text-md-center text-xl-left">
                                    <h6 className="mb-1">Solde de Départ</h6>
                                </div>
                                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                                    <h6 className="font-weight-bold mb-0">32 123 €</h6>
                                </div>
                            </div>
                            <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                                <div className="text-md-center text-xl-left">
                                    <h6 className="mb-1">Solde Actuel</h6>
                                </div>
                                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                                    <h6 className="font-weight-bold mb-0">8000 €</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 grid-margin stretch-card">
                    <ExpensesTable/>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-4 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h5 style={{fontSize: "larger"}}>Besoins</h5>
                            <div className="card-container">
                                <div className="row">
                                    <div /*className="col-8 col-sm-12 col-xl-8 my-auto"*/>
                                        <div className="d-flex d-sm-block d-md-flex align-items-center">
                                            <h3 className="mb-0">32 123 € / 40 000 €</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <NeedsIcon/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h5 style={{fontSize: "larger"}}>Plaisirs</h5>
                            <div className="card-container">
                                <div className="row">
                                    <div /*className="col-8 col-sm-12 col-xl-8 my-auto"*/>
                                        <div className="d-flex d-sm-block d-md-flex align-items-center">
                                            <h3 className="mb-0">45 850 € / 50 000 €</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <WantsIcon/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h5 style={{fontSize: "larger"}}>Economies</h5>
                            <div className="card-container">
                                <div className="row">
                                    <div /*className="col-8 col-sm-12 col-xl-8 my-auto"*/>
                                        <div className="d-flex d-sm-block d-md-flex align-items-center">
                                            <h3 className="mb-0">2 039 € / 6000 €</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <SavingIcon/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <CategoryDetails/>
            </div>
            <div className="row">
                <div className="col-md-6 col-xl-4 stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-row justify-content-between">
                                <h4 className="card-title mb-1">Sous-Catégories</h4>
                                <p className="text-muted mb-1">Description</p>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="preview-list">
                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-primary">
                                                    <i className="mdi mdi-file-document"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Loisirs</h6>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                    <p className="text-muted">escape game, restaurant, shopping</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-success">
                                                    <i className="mdi mdi-cloud-download"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Courses</h6>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                    <p className="text-muted">Nourritures</p>
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
                                                    <h6 className="preview-subject">Project meeting</h6>
                                                    <p className="text-muted mb-0">New project discussion</p>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                    <p className="text-muted">35 minutes ago</p>
                                                    <p className="text-muted mb-0">15 tasks, 2 issues</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="preview-item border-bottom">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-danger">
                                                    <i className="mdi mdi-email-open"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">Broadcast Mail</h6>
                                                    <p className="text-muted mb-0">Sent release details to team</p>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                    <p className="text-muted">55 minutes ago</p>
                                                    <p className="text-muted mb-0">35 tasks, 7 issues </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="preview-item">
                                            <div className="preview-thumbnail">
                                                <div className="preview-icon bg-warning">
                                                    <i className="mdi mdi-chart-pie"></i>
                                                </div>
                                            </div>
                                            <div className="preview-item-content d-sm-flex flex-grow">
                                                <div className="flex-grow">
                                                    <h6 className="preview-subject">UI Design</h6>
                                                    <p className="text-muted mb-0">New application planning</p>
                                                </div>
                                                <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                                                    <p className="text-muted">50 minutes ago</p>
                                                    <p className="text-muted mb-0">27 tasks, 4 issues </p>
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
                                <input type="text" className="form-control todo-list-input" placeholder="enter task.." />
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
