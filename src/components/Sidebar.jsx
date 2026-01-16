import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const linkClass = ({ isActive }) =>
        `block px-4 py-2 rounded-md transition-colors duration-200 
     ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"}`;

    return (
        <aside className="w-64 bg-white shadow-lg p-4" aria-label="Sidebar Navigation">
            <h2 className="text-lg font-bold mb-6 text-gray-800">🏦 Elevens Bank</h2>
            <nav className="space-y-2" aria-label="Main Menu">
                {[
                    { path: "/dashboard", label: "Dashboard" },
                    { path: "/accounts", label: "Accounts" },
                    { path: "/transactions", label: "Transactions" },
                    { path: "/loans", label: "Loans" },
                    { path: "/cards", label: "Cards" },
                    { path: "/notifications", label: "Notifications" },
                    { path: "/profile", label: "Profile" }
                ].map(({ path, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) => `
                            block px-4 py-2 rounded-md transition-colors duration-200 outline-none
                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            ${isActive
                                ? "bg-blue-600 text-white font-medium"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                            }
                        `}
                        aria-current={({ isActive }) => isActive ? "page" : undefined}
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
