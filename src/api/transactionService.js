// src/api/transactionService.js
import { transactionApi } from "./axios";

export const getTransactionsByAccount = async (accountId) => {
    const response = await transactionApi.get(`/api/transactions/account/${accountId}`);
    return response.data;
};
