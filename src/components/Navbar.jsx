import useAuth from "../hooks/useAuth"; // ✅ fixed import

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <header
            className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center"
            role="banner"
            aria-label="Top Navigation"
        >
            <h1 className="font-semibold">Welcome to Elevens Bank</h1>
            <button
                onClick={logout}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                aria-label="Logout"
            >
                Logout
            </button>
        </header>
    );
}
