import React from 'react';

const Sidebar = () => {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                <a className="sidebar-brand brand-logo" href="index.html">
                    {/*<img src="../../../images/logo.svg" alt="logo" />*/}
                    BUDGETFLEX
                </a>
                <a className="sidebar-brand brand-logo-mini" href="index.html">
                    <img src="../../../images/logo-mini.svg" alt="logo" />
                </a>
            </div>
            <ul className="nav">
                
                <li className="nav-item nav-category">
                    <span className="nav-link">Menu</span>
                </li>
                <li className="nav-item menu-items">
                    <a className="nav-link" href="http://localhost:3000/dashboard">
                        <span className="menu-icon">
                          <i className="mdi mdi-speedometer"></i>
                        </span>
                        <span className="menu-title">Suivi budget</span>
                    </a>
                </li>
                <li className="nav-item menu-items">
                    <a className="nav-link" href="http://localhost:3000/dashboard">
                        <span className="menu-icon">
                          <i className="mdi mdi-speedometer"></i>
                        </span>
                        <span className="menu-title">Profil</span>
                    </a>
                </li>
                <li className="nav-item menu-items">
                    <a className="nav-link" href="http://localhost:3000/dashboard">
                        <span className="menu-icon">
                          <i className="mdi mdi-speedometer"></i>
                        </span>
                        <span className="menu-title">Suivi budget passé</span>
                    </a>
                </li>
                <li className="nav-item menu-items">
                    <a className="nav-link" href="http://localhost:3000/dashboard">
                        <span className="menu-icon">
                          <i className="mdi mdi-speedometer"></i>
                        </span>
                        <span className="menu-title">Paramètres</span>
                    </a>
                </li>
                {/* Other nav items */}
            </ul>
        </nav>
    );
}

export default Sidebar;
