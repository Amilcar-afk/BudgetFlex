import sendRequest from '../../services/axiosRequestFunction';

const route = '/budget/month';

const BudgetMonthApi = {
    add: async function (data) {
        return sendRequest(route +'/new', 'POST', data, true);
    },

    get: async function (id) {
        return sendRequest(route +`/${id}`, 'GET', {}, true);
    },

    edit: async function (id, data) {
        return sendRequest(route +`/${id}/edit`, 'PUT', data, true);
    },

    getUserList: async function (userId) {
        return sendRequest(route +`/user/${userId}`, 'GET', {}, true);
    },

    getLastActive: async function (userId) {
        return sendRequest(route +`/active/${userId}`, 'GET', {}, true);
    },

};

export default BudgetMonthApi;
