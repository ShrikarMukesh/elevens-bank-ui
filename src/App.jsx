// src/App.jsx
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext"; // ✅ no curly braces
import { BrowserRouter } from "react-router-dom";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
}
