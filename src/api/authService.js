// src/api/authService.js
import { authApi } from "./axios";

export const loginUser = async (credentials) => {
    const res = await authApi.post("/auth/login", credentials);
    return res.data;
};
