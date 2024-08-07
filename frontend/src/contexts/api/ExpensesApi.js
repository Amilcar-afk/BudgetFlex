import sendRequest from '../../services/axiosRequestFunction';

const route = '/expenses';

const ExpensesApi = {
    add: async function (data) {
        console.log("apii")
        console.log(data)
        return sendRequest(route +'/new', 'POST', data, true);
    },

    edit: async function (id, data) {
        return sendRequest(route +`/${id}/edit`, 'PUT', data, true);
    },

    getBudgetMonthExpenses: async function (budgetMonthId) {
        return sendRequest(route +`/budget/${budgetMonthId}`, 'GET', {}, true);
    },

    delete: async function (id) {
        return sendRequest(route +`/${id}`, 'DELETE', {}, true);
    },

};

export default ExpensesApi;
