import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'flowbite/dist/flowbite.css';
import 'tailwindcss/tailwind.css';
import './styles/style.css';
import DashboardPage from "./features/Dashboard/DashboardPage";
import UserProvider from "./contexts/AuthContext";
import RegisterPage from "./features/Auth/RegisterPage";
import LoginPage from "./features/Auth/LoginPage";
import BudgetMonthProvider from "./contexts/BudgetMonthContext";
import LogoutPage from "./features/Auth/LogoutPage";
import ExpensesProvider from "./contexts/ExpensesContext";


function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <BudgetMonthProvider>
                    <ExpensesProvider>
                        <Routes>
                            <Route path="/dashboard" element={<DashboardPage/>} />
                            <Route path="/register" element={<RegisterPage/>} />
                            <Route path="/login" element={<LoginPage/>} />
                            <Route path="/logout" element={<LogoutPage/>} />
                        </Routes>
                    </ExpensesProvider>
                </BudgetMonthProvider>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
