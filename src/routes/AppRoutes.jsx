import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Accounts from "../pages/Accounts";
import Transactions from "../pages/Transactions";
import Loans from "../pages/Loans";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected layout and pages */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <DashboardLayout />
                    </PrivateRoute>
                }
            >
                {/* These are nested routes rendered inside DashboardLayout’s <Outlet /> */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="accounts" element={<Accounts />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="loans" element={<Loans />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    );
}
