import axios from 'axios';

const API_BASE_URL = process.env.SYMFONY_APP_SERVER;

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
});

const sendRequest = async (endpoint, method = 'GET', data = {}, requireAuth = true, params = {}, userId = null) => {
    try {
        console.log(endpoint);
        console.log(data);
        console.log(method)
        return await axiosInstance({
            url: endpoint,
            method,
            data,
            params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            },
        })
    } catch (error) {
        //console.error('Error with the request:', error.response?.data || error.message);
        throw error;
    }
};

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default sendRequest;
