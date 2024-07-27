import React from 'react';
import RegisterForm from './components/RegisterForm';

const RegisterPage = () => {
    return (
        <div className="form-auth-container flex items-center justify-center h-full">
            <div className="w-full max-w-md">
                <RegisterForm/>
            </div>
        </div>
    );
}

export default RegisterPage;
