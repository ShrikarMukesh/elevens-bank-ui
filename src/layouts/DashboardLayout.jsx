// src/layouts/DashboardLayout.jsx
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Navbar />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
