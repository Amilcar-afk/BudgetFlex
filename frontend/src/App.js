import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Button } from 'flowbite-react';
import 'flowbite/dist/flowbite.css';
import './styles/style.css';
import DashboardPage from "./features/Dashboard/DashboardPage";
import UserProvider from "./contexts/userContext";


function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/api/hello')
            .then(response => response.text())
            .then(message => setMessage(message));
    }, []);

    useEffect(() => {
        console.log(message);
    }, [message]);

    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/dashboard" element={<DashboardPage/>} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
