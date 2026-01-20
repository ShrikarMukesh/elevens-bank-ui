import { transactionApi } from "./axios";

export const getTransactionsByAccount = async (accountId) => {
    try {
        const response = await transactionApi.get(`/api/transactions/account/${accountId}`);
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("❌ Error fetching transactions:", error);
        throw error;
    }
};
