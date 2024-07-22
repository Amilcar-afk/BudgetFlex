import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Button } from 'flowbite-react';
import 'flowbite/dist/flowbite.css';
import DashboardPage from "./features/Dashboard/DashboardPage";
import './styles/style.css';


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
            <Routes>
                {/* Définissez ici la route vers la page d'accueil si elle existe */}
                <Route path="/dashboard" element={<DashboardPage/>} />
                {/* Vous pouvez ajouter d'autres routes ici */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
