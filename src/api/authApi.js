import axiosClient from "./axiosClient";

export const AuthAPI = {
    login: ({ username, password }) =>
        axiosClient.post(`/auth/login?username=${username}&password=${password}`)

};
