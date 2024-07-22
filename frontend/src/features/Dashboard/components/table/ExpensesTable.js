import * as React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NeedsIcon from "../category/NeedsIcon";
import WantsIcon from "../category/WantsIcon";
import SavingIcon from "../category/SavingIcon";

export default function ExpensesTable() {
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Suivie des dépenses</h4>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>
                                <div className="form-check form-check-muted m-0">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" />
                                    </label>
                                </div>
                            </th>
                            <th> Date </th>
                            <th> Nom </th>
                            <th> Montant </th>
                            <th> Sous-catégorie </th>
                            <th> Catégorie </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div className="form-check form-check-muted m-0">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" />
                                    </label>
                                </div>
                            </td>
                            <td>
                                10/02/2024
                            </td>
                            <td> Courses </td>
                            <td> 48 €</td>
                            <td> provisions </td>
                            <td>
                                <NeedsIcon/>
                            </td>
                            <td>
                                <button className="btn" title="Modifier">
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button className="btn" title="Supprimer">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="form-check form-check-muted m-0">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" />
                                    </label>
                                </div>
                            </td>
                            <td>
                                14/02/2024
                            </td>
                            <td> virement vers livret A </td>
                            <td> 50 €</td>
                            <td> economies </td>
                            <td>
                                <SavingIcon/>
                            </td>
                            <td>
                                <button className="btn" title="Modifier">
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button className="btn" title="Supprimer">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="form-check form-check-muted m-0">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" />
                                    </label>
                                </div>
                            </td>
                            <td>
                                17/02/2024
                            </td>
                            <td> virement </td>
                            <td> 35,50 €</td>
                            <td> cadeau </td>
                            <td>
                                <WantsIcon/>
                            </td>
                            <td>
                                <button className="btn" title="Modifier">
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button className="btn" title="Supprimer">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="form-check form-check-muted m-0">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" />
                                    </label>
                                </div>
                            </td>
                            <td>
                                20/02/2024
                            </td>
                            <td> pantalons </td>
                            <td> 20,50 €</td>
                            <td> Vêtement </td>
                            <td>
                                <WantsIcon/>
                            </td>
                            <td>
                                <button className="btn" title="Modifier">
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button className="btn" title="Supprimer">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="form-check form-check-muted m-0">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" />
                                    </label>
                                </div>
                            </td>
                            <td>
                                18/02/2024
                            </td>
                            <td> pantalons </td>
                            <td> 20,50 €</td>
                            <td> Vêtement </td>
                            <td>
                                <WantsIcon/>
                            </td>
                            <td>
                                <button className="btn" title="Modifier">
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button className="btn" title="Supprimer">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}