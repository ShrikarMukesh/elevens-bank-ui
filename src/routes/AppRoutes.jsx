// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Accounts from "../pages/Accounts";
import Transactions from "../pages/Transactions";
import Loans from "../pages/Loans";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    </PrivateRoute>
                }
            />
            <Route
                path="/accounts"
                element={
                    <PrivateRoute>
                        <DashboardLayout>
                            <Accounts />
                        </DashboardLayout>
                    </PrivateRoute>
                }
            />
            <Route
                path="/transactions"
                element={
                    <PrivateRoute>
                        <DashboardLayout>
                            <Transactions />
                        </DashboardLayout>
                    </PrivateRoute>
                }
            />
            <Route
                path="/loans"
                element={
                    <PrivateRoute>
                        <DashboardLayout>
                            <Loans />
                        </DashboardLayout>
                    </PrivateRoute>
                }
            />
            <Route
                path="/notifications"
                element={
                    <PrivateRoute>
                        <DashboardLayout>
                            <Notifications />
                        </DashboardLayout>
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <DashboardLayout>
                            <Profile />
                        </DashboardLayout>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}
