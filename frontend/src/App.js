import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'flowbite/dist/flowbite.css';
import './styles/style.css';
import DashboardPage from "./features/Dashboard/DashboardPage";
import UserProvider from "./contexts/authContext";
import RegisterPage from "./features/Auth/RegisterPage";
import LoginPage from "./features/Auth/LoginPage";


function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/dashboard" element={<DashboardPage/>} />
                    <Route path="/register" element={<RegisterPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
