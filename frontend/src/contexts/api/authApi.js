import sendRequest from '../../services/axiosRequestFunction';

const authApi = {
    register: async function (user) {
        return sendRequest('/register', 'POST', user, true);
    },

    login: async function (credentials) {
        console.log("login")
        console.log(credentials)
        return sendRequest('/login', 'POST', credentials, false);
    },

    logout: async function () {
        return sendRequest('/logout', 'POST', {}, true);
    },
};

export default authApi;
