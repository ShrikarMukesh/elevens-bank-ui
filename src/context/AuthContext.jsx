// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("authToken"));
    const [user, setUser] = useState(null);

    // Sync token with localStorage
    useEffect(() => {
        if (token) localStorage.setItem("authToken", token);
        else localStorage.removeItem("authToken");
    }, [token]);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
    };

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
