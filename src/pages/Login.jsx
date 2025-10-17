import { useState } from "react";
import { AuthAPI } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await AuthAPI.login(form);
            const { token } = res.data;

            localStorage.setItem("authToken", token);
            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message || "Invalid credentials. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 shadow-lg rounded-2xl w-96 border border-blue-100"
            >
                <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                    🏦 Elevens Bank Login
                </h1>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
                    required
                />

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm mt-4 text-center text-gray-500">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-blue-600 font-medium">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
