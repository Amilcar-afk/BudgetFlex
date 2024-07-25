// src/services/axiosRequestFunction.js
import axios from 'axios';

const API_BASE_URL = process.env.SYMFONY_APP_SERVER;

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
});

let csrfToken = null;

const fetchCsrfTokenForNewOrEdit = async () => {
    try {
        const response = await axiosInstance.get('/user/new');
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, 'text/html');
        csrfToken = doc.querySelector('input[name="user[_token]"]').value;
        console.log('CSRF token for new/edit fetched:', csrfToken);
    } catch (error) {
        console.error('Error fetching CSRF token for new/edit:', error.response?.data || error.message);
    }
};

const fetchCsrfTokenForDelete = async (userId) => {
    try {
        const response = await axiosInstance.get(`/user/${userId}/csrf-token`);
        csrfToken = response.data.csrfToken;
        console.log('CSRF token for delete fetched:', csrfToken);
    } catch (error) {
        console.error('Error fetching CSRF token for delete:', error.response?.data || error.message);
    }
};

const sendRequest = async (endpoint, method = 'GET', data = {}, requireAuth = true, params = {}, userId = null) => {
    if (method === 'POST' || method === 'PUT') {
        await fetchCsrfTokenForNewOrEdit();
    } else if (method === 'DELETE' && userId) {
        await fetchCsrfTokenForDelete(userId);
    }

    try {
        const response = await axiosInstance({
            url: endpoint,
            method,
            data,
            params,
            headers: csrfToken ? { 'X-CSRF-Token': csrfToken } : {},
        });
        return response.data;
    } catch (error) {
        console.error('Error with the request:', error.response?.data || error.message);
        throw error;
    }
};

axiosInstance.interceptors.request.use(
    (config) => {
        if (csrfToken) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default sendRequest;
