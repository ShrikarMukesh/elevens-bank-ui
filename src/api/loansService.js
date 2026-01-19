import { loansApi } from "./axios";

export const LoansService = {
    // Get all loans for the authenticated user
    getMyLoans: (customerId) => loansApi.get(`/loans/my-loans?customerId=${customerId}`),

    // Apply for a new loan
    applyForLoan: (loanData) => loansApi.post("/apply", loanData),

    // Get loan details
    getLoanDetails: (loanId) => loansApi.get(`/${loanId}`),

    // Make a loan payment
    makePayment: (loanId, paymentData) => loansApi.post(`/${loanId}/pay`, paymentData),

    // Get loan payment history
    getLoanHistory: (loanId) => loansApi.get(`/${loanId}/history`),

    // Calculate EMI (if endpoint exists)
    calculateEMI: (data) => loansApi.post("/calculate-emi", data)
};
