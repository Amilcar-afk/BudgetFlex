import React from 'react';

const Sidebar = () => {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                <a href="#" className="flex mb-6 text-2xl font-semibold text-white grid-margin-sm-0">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                         alt="logo"/>
                    BudgetFlex
                </a>
                <a className="sidebar-brand brand-logo-mini" href="index.html">
                    <img src="../../../images/logo-mini.svg" alt="logo"/>
                </a>
            </div>
            <ul className="nav">

                <li className="nav-item nav-category">
                    <span className="nav-link text-white">Menu</span>
                </li>
                <li className="nav-item menu-items">
                    <a className="nav-link" href="http://localhost:3000/dashboard">
                        <span className="menu-icon">
                          <i className="mdi mdi-speedometer"></i>
                        </span>
                        <span className="menu-title text-white">Suivi budget</span>
                    </a>
                </li>
                <li className="nav-item menu-items">
                    <a className="nav-link" href="http://localhost:3000/dashboard">
                        <span className="menu-icon">
                          <i className="mdi mdi-speedometer"></i>
                        </span>
                        <span className="menu-title text-white">Profil</span>
                    </a>
                </li>
                <li className="nav-item menu-items">
                    <a className="nav-link" href="http://localhost:3000/dashboard">
                        <span className="menu-icon">
                          <i className="mdi mdi-speedometer"></i>
                        </span>
                        <span className="menu-title text-white">Suivi budget passé</span>
                    </a>
                </li>
                <li className="nav-item menu-items">
                    <a className="nav-link" href="http://localhost:3000/dashboard">
                        <span className="menu-icon">
                          <i className="mdi mdi-speedometer"></i>
                        </span>
                        <span className="menu-title text-white">Paramètres</span>
                    </a>
                </li>
                {/* Other nav items */}
            </ul>
        </nav>
    );
}

export default Sidebar;
