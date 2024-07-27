import sendRequest from '../../services/axiosRequestFunction';

const authApi = {
    register: async function (user) {
        return sendRequest('/register', 'POST', user, true);
    },

    login: async function (credentials) {
        return sendRequest('/login', 'POST', credentials, true);
    },

    logout: async function () {
        return sendRequest('/logout', 'POST', {}, true);
    },

    getCsrfToken: async function () {
        return sendRequest('/api/csrf-token', 'GET', {}, true);
    },
};

export default authApi;
