import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SkipToContent from "../components/SkipToContent";

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-gray-100 relative">
            <SkipToContent />
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Navbar />
                <main id="main-content" className="flex-1 p-6" tabIndex="-1">
                    <Outlet /> {/* Nested route content appears here */}
                </main>
            </div>
        </div>
    );
}
