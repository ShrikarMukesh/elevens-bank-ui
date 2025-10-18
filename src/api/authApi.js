import axiosClient from "./axiosClient";
import {authApi} from "./axios";

export const AuthAPI = {
    login: ({ username, password }) =>
        axiosClient.post(`/auth/login?username=${username}&password=${password}`),

    refreshToken: async () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const response = await authApi.post("/auth/refresh", { refreshToken });
        return response.data;
    },
    register: (data) => authApi.post("/auth/register", data),
};
