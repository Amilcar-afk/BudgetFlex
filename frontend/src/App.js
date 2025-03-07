import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'flowbite/dist/flowbite.css';
import 'tailwindcss/tailwind.css';
import './styles/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import DashboardPage from "./features/Dashboard/DashboardPage";
import RegisterPage from "./features/Auth/RegisterPage";
import LoginPage from "./features/Auth/LoginPage";
import BudgetMonthProvider from "./contexts/BudgetMonthContext";
import LogoutPage from "./features/Auth/LogoutPage";
import ExpensesProvider from "./contexts/ExpensesContext";
import AuthProvider from "./contexts/AuthContext";
import {ToastContainer} from "react-toastify";


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <BudgetMonthProvider>
                    <ExpensesProvider>
                        <Routes>
                            <Route path="/dashboard" element={<DashboardPage/>} />
                            <Route path="/register" element={<RegisterPage/>} />
                            <Route path="/login" element={<LoginPage/>} />
                            <Route path="/logout" element={<LogoutPage/>} />
                        </Routes>
                        <ToastContainer/>
                    </ExpensesProvider>
                </BudgetMonthProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
