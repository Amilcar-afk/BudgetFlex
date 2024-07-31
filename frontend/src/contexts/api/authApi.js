import sendRequest from '../../services/axiosRequestFunction';

const AuthApi = {
    register: async function (user) {
        return sendRequest('/register', 'POST', user, true);
    },

    login: async function (credentials) {
        return sendRequest('/login', 'POST', credentials, false);
    },

    logout: async function () {
        return sendRequest('/logout', 'POST', {}, true);
    },
};

export default AuthApi;
