import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}