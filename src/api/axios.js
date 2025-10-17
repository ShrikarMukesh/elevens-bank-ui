// src/api/axios.js
import axios from "axios";

export const authApi = axios.create({
    baseURL: process.env.REACT_APP_AUTH_API || "http://localhost:7001",
});

export const customerApi = axios.create({
    baseURL: process.env.REACT_APP_CUSTOMER_API || "http://localhost:6001",
});

export const accountApi = axios.create({
    baseURL: process.env.REACT_APP_ACCOUNT_API || "http://localhost:3001",
});

export const transactionApi = axios.create({
    baseURL: process.env.REACT_APP_TRANSACTION_API || "http://localhost:4001",
});

// 🔐 Attach JWT token to each request
const attachToken = (config) => {
    const token = localStorage.getItem("authToken"); // ✅ consistent key
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
};

// 🚨 Handle expired/invalid token globally
const handleError = (error) => {
    if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }
    return Promise.reject(error);
};

// ✅ Register interceptors for all microservice APIs
[authApi, customerApi, accountApi, transactionApi].forEach((instance) => {
    instance.interceptors.request.use(attachToken);
    instance.interceptors.response.use((res) => res, handleError);
});
