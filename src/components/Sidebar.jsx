// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white shadow-lg p-4">
            <h2 className="text-lg font-bold mb-6">🏦 Elevens Bank</h2>
            <nav className="space-y-3">
                <Link to="/dashboard" className="block hover:text-blue-600">Dashboard</Link>
                <Link to="/accounts" className="block hover:text-blue-600">Accounts</Link>
                <Link to="/transactions" className="block hover:text-blue-600">Transactions</Link>
                <Link to="/loans" className="block hover:text-blue-600">Loans</Link>
                <Link to="/notifications" className="block hover:text-blue-600">Notifications</Link>
                <Link to="/profile" className="block hover:text-blue-600">Profile</Link>
            </nav>
        </aside>
    );
}
