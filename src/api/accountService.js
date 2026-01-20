import { accountApi } from "./axios";

export const getAccountsByCustomer = async (customerId) => {
    try {
        const response = await accountApi.get(`/api/accounts/customer/${customerId}`);
        return response.data; // expecting an array of accounts
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching accounts:", error);
        throw error;
    }
};

export const transferFunds = async (payload) => {
    const response = await accountApi.post("/api/accounts/transfer", payload);
    return response.data;
};

export const getAccountById = async (accountId) => {
    try {
        const response = await accountApi.get(`/api/accounts/${accountId}`);
        return response.data; // expecting an array of accounts
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching accounts:", error);
        throw error;
    }
};