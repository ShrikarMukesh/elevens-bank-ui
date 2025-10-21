import { accountApi } from "./axios";

export const getAccountsByCustomer = async (customerId) => {
    const response = await accountApi.get(`/api/accounts/customer/${customerId}`);
    return response.data;
};

