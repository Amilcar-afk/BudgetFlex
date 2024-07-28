import React, {useState, useContext} from 'react';
import {AuthContext} from '../../../contexts/authContext';
import {useNavigate} from "react-router-dom";

const RegisterComponent = () => {
    const {register} = useContext(AuthContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        plainPassword: '',
        agreeTerms: false,
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setUserData({
            ...userData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            'registration_form[firstname]': userData.firstname,
            'registration_form[lastname]': userData.lastname,
            'registration_form[email]': userData.email,
            'registration_form[plainPassword]': userData.plainPassword,
            'registration_form[agreeTerms]': userData.agreeTerms ? 1 : 0,
        };
        const responseCode = register(formattedData);
        if (responseCode === 201){
            navigate('/login');
        }
    };

    return (
        <section className="card-body">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                         alt="logo"/>
                    BudgetFlex
                </a>
                <div
                    className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Créer un compte
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="firstname"
                                       className="block mb-2 text-sm font-medium text-white">
                                    Nom</label>
                                <input type="text" name="firstname" id="firstname"
                                       className=" border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                       value={userData.firstname}
                                       onChange={handleChange}
                                       placeholder="Nom*" required=""/>
                            </div>
                            <div>
                                <label htmlFor="lastname"
                                       className="block mb-2 text-sm font-medium text-white">
                                    Prénom</label>
                                <input type="text" name="lastname" id="lastname"
                                       className=" border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                       value={userData.lastname}
                                       onChange={handleChange}
                                       placeholder="Prénom*" required=""/>
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-white">
                                    Email</label>
                                <input type="email" name="email" id="email"
                                       className=" border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                       value={userData.email}
                                       onChange={handleChange}
                                       placeholder="name@company.com*" required=""/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-white">Mot-de-passe</label>
                                <input type="password" name="plainPassword" id="password"
                                       placeholder="••••••••"
                                       className=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 "
                                       value={userData.plainPassword}
                                       onChange={handleChange}
                                       required=""/>
                            </div>
                            <div>
                                <label htmlFor="confirm-password"
                                       className="block mb-2 text-sm font-medium text-white">Confirmer le
                                    mot-de-passe</label>
                                <input type="password" name="confirm-password" id="confirm-password"
                                       placeholder="••••••••"
                                       className=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 "
                                       required=""/>
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="agreeTerms" aria-describedby="terms" type="checkbox" name="agreeTerms"
                                           className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                                           checked={userData.agreeTerms}
                                           onChange={handleChange}
                                           required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-300">
                                        I accept the <a className="font-medium  hover:underline text-primary-500"
                                                        href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                                Créer un compte
                            </button>
                            <p className="text-sm font-light text-gray-500 text-gray-400">
                                Déjà un compte ?
                                <a href="#" className="font-medium hover:underline text-primary-500">
                                    Connecter vous
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterComponent;
