import sendRequest from '../../services/axiosRequestFunction';

const userApi = {
    add: async function (user) {
        return sendRequest('/user/new', 'POST', user, true);
    },

    getList: async function () {
        return sendRequest('/user', 'GET', {}, true);
    },

    get: async function (id) {
        return sendRequest(`/user/${id}`, 'GET', {}, true);
    },

    update: async function (id, user) {
        return sendRequest(`/user/${id}`, 'PUT', user, true);
    },

    delete: async function (id, token) {
        return sendRequest(`/user/${id}`, 'DELETE', { _token: token }, true);
    },

    getCsrfTokenForDelete: async function (id) {
        return sendRequest(`/user/${id}/csrf-token`, 'GET', {}, true);
    },
};

export default userApi;
