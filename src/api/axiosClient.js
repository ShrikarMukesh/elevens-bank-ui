import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:7001", // 👈 your API Gateway or Auth Service
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // eslint-disable-next-line no-console
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
