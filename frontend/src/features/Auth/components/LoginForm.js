import React, {useState, useContext} from 'react';
import {AuthContext} from '../../../contexts/AuthContext';
import {useNavigate} from "react-router-dom";

const LoginComponent = () => {
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseCode = await login(credentials);
            console.log("responseCode")
            console.log(responseCode)
            if (responseCode === 200) {
                console.log("before dashboard")
                navigate('/dashboard');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <section className="card-body">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="http://localhost:8000/login" className="flex items-center mb-6 text-2xl font-semibold text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                         alt="logo"/>
                    BudgetFlex
                </a>
                <div
                    className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Se connecter
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-white">
                                    Email</label>
                                <input type="email" name="email" id="email"
                                       className=" border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                       onChange={handleChange}
                                       value={credentials.email}
                                       placeholder="name@company.com*" required=""/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-white">Mot-de-passe</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       className=" border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 "
                                       onChange={handleChange}
                                       value={credentials.password}
                                       required=""/>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                                Se connecter
                            </button>
                            <p className="text-sm font-light text-gray-500 text-gray-400">
                                Pas de compte ?
                                <a href="http://localhost:8000/register" className="font-medium hover:underline text-primary-500">
                                    Inscrivez-vous
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginComponent;
