import React from 'react';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
    return (
        <div className="form-auth-container flex items-center justify-center h-full">
            <div className="w-full max-w-md">
                <LoginForm/>
            </div>
        </div>
    );
}

export default LoginPage;
