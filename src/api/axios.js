import axios from "axios";
import { AuthAPI } from "./authApi";

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

export const notificationApi = axios.create({
    baseURL: process.env.REACT_APP_NOTIFICATION_API || "http://localhost:5001",
});

// 🔐 Attach JWT token to each request
const attachToken = (config) => {
    const token = localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
};

// 🚀 Token refresh logic
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

const handleError = async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axios(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const { accessToken, refreshToken } = await AuthAPI.refreshToken();
            localStorage.setItem("authToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            processQueue(null, accessToken);

            // retry failed request
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            localStorage.clear();
            window.location.href = "/login";
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }

    return Promise.reject(error);
};

// ✅ Register interceptors
[authApi, customerApi, accountApi, transactionApi].forEach((instance) => {
    instance.interceptors.request.use(attachToken);
    instance.interceptors.response.use((res) => res, handleError);
});
