import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

const RegisterComponent = () => {
    const { register, fetchCsrfToken, csrfToken } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        'registration_form[firstname]': '',
        'registration_form[lastname]': '',
        'registration_form[email]': '',
        'registration_form[plainPassword]': '',
        'registration_form[agreeTerms]': false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData({
            ...userData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchCsrfToken(); // Fetch the CSRF token before submitting the form
        register({ ...userData, _csrf_token: csrfToken }); // Include CSRF token in the payload
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstname"
                value={userData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                name="lastname"
                value={userData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="plainPassword"
                value={userData.plainPassword}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <label>
                <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={userData.agreeTerms}
                    onChange={handleChange}
                />
                Agree to terms
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterComponent;
