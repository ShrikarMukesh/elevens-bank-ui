// src/api/customerService.js
import { customerApi } from "./axios";

// ✅ Get customer by customerId
export const getCustomerById = async (customerId) => {
    try {
        const response = await customerApi.get(`/api/customers/${customerId}`);
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("❌ Error fetching customer by ID:", error);
        throw error;
    }
};

// ✅ Get customer by userId
export const getCustomerByUserId = async (userId) => {
    try {
        const response = await customerApi.get(`/api/customers/user/${userId}`);
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("❌ Error fetching customer by User ID:", error);
        throw error;
    }
};

// ✅ Update customer details
export const updateCustomer = async (customerId, updatedData) => {
    try {
        const response = await customerApi.put(`/api/customers/${customerId}`, updatedData);
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("❌ Error updating customer:", error);
        throw error;
    }
};

// ✅ Get all customers (for admin dashboards)
export const getAllCustomers = async () => {
    try {
        const response = await customerApi.get("/api/customers");
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("❌ Error fetching customers:", error);
        throw error;
    }
};

// ✅ Delete customer
export const deleteCustomer = async (customerId) => {
    try {
        const response = await customerApi.delete(`/api/customers/${customerId}`);
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("❌ Error deleting customer:", error);
        throw error;
    }
};

// ✅ Verify KYC
export const verifyCustomerKYC = async (customerId) => {
    try {
        const response = await customerApi.put(`/api/customers/${customerId}/kyc/verify`);
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("❌ Error verifying customer KYC:", error);
        throw error;
    }
};
