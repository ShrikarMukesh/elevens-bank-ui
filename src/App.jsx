import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
                <LoadingProvider>
                    <AuthProvider>
                        <AppRoutes />
                    </AuthProvider>
                </LoadingProvider>
            </BrowserRouter>
        </ErrorBoundary>
    );
}