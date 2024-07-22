import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MainPanel from './components/MainPanel';

const DashboardPage = () => {
    return (
        <div className="container-scroller">
            <Sidebar />
            <div className="container-fluid page-body-wrapper">
                <Navbar />
                <MainPanel />
            </div>
        </div>
    );
}

export default DashboardPage;
