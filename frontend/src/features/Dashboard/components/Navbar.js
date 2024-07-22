import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar p-0 fixed-top d-flex flex-row">
            <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
                <a className="navbar-brand brand-logo-mini" href="http://localhost:3000/dashboard">
                    {/*<img src="../../../images/logo-mini.svg" alt="logo" />*/}
                    BUDGETFLEX
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
