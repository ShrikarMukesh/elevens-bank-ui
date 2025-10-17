// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // ✅ no curly braces

export default function PrivateRoute({ children }) {
    const { token } = useAuth(); // ✅ token from AuthContext

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
