import sendRequest from '../../services/axiosRequestFunction';

const AuthApi = {
    register: async function (user) {
        return sendRequest('/register', 'POST', user, true, null, "application/x-www-form-urlencoded");
    },

    login: async function (credentials) {
        return sendRequest('/login', 'POST', credentials, false, null,  "application/x-www-form-urlencoded");
    },

    logout: async function () {
        return sendRequest('/logout', 'POST', {}, true);
    },
};

export default AuthApi;
