import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const linkClass = ({ isActive }) =>
        `block px-4 py-2 rounded-md transition-colors duration-200 
     ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"}`;

    return (
        <aside className="w-64 bg-white shadow-lg p-4">
            <h2 className="text-lg font-bold mb-6">🏦 Elevens Bank</h2>
            <nav className="space-y-2">
                <NavLink to="/dashboard" className={linkClass}>
                    Dashboard
                </NavLink>
                <NavLink to="/accounts" className={linkClass}>
                    Accounts
                </NavLink>
                <NavLink to="/transactions" className={linkClass}>
                    Transactions
                </NavLink>
                <NavLink to="/loans" className={linkClass}>
                    Loans
                </NavLink>
                <NavLink to="/notifications" className={linkClass}>
                    Notifications
                </NavLink>
                <NavLink to="/profile" className={linkClass}>
                    Profile
                </NavLink>
            </nav>
        </aside>
    );
}
