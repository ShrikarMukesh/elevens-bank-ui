import { loansApi } from "./axios";

export const LoansService = {
    // Get all loans for the authenticated user
    getMyLoans: (customerId) => loansApi.get(`/loans/my-loans?customerId=${customerId}`),

    // Apply for a new loan
    applyForLoan: (loanData) => loansApi.post("/loans/apply", loanData),

    // Approve a loan (ADMIN only)
    approveLoan: (loanId) => loansApi.put(`/loans/${loanId}/approve`),
};
