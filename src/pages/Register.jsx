import { useState, useEffect } from "react";
import { AuthAPI } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        passwordHash: "",
        phone: "",
        role: "CUSTOMER",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // 🚫 If already logged in, redirect to dashboard
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) navigate("/dashboard");
    }, [navigate]);

    // 🧠 Client-side validation
    const validate = () => {
        const newErrors = {};

        if (!form.username.trim()) newErrors.username = "Username is required.";
        else if (form.username.length < 3)
            newErrors.username = "Username must be at least 3 characters.";

        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
            newErrors.email = "Enter a valid email address.";

        if (form.passwordHash.length < 6)
            newErrors.passwordHash = "Password must be at least 6 characters.";

        if (form.phone && !/^\d{10}$/.test(form.phone))
            newErrors.phone = "Enter a valid 10-digit phone number.";

        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // clear specific error
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const res = await AuthAPI.register(form); // ✅ sends passwordHash
            const { accessToken, refreshToken, user } = res.data;

            if (!accessToken || !user)
                throw new Error("Unexpected response from server.");

            // ✅ Store tokens locally
            localStorage.setItem("authToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("userId", user.userId);
            localStorage.setItem("username", user.username);
            localStorage.setItem("role", user.role);

            setSuccess(true);
            setTimeout(() => navigate("/dashboard"), 1200);
        } catch (err) {
            console.error("Registration failed:", err);
            const backendMessage =
                err.response?.data?.message?.toLowerCase() || "";

            if (backendMessage.includes("username"))
                setErrors({ username: "Username already exists." });
            else if (backendMessage.includes("email"))
                setErrors({ email: "Email already registered." });
            else
                setErrors({ general: "Registration failed. Please try again later." });
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
                    🏦 Create Your Elevens Bank Account
                </h1>

                {/* Username */}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className={`w-full mb-2 p-2 border rounded focus:ring-2 outline-none ${
                        errors.username
                            ? "border-red-400 focus:ring-red-300"
                            : "focus:ring-blue-400"
                    }`}
                />
                {errors.username && (
                    <p className="text-red-500 text-xs mb-2">{errors.username}</p>
                )}

                {/* Email */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full mb-2 p-2 border rounded focus:ring-2 outline-none ${
                        errors.email
                            ? "border-red-400 focus:ring-red-300"
                            : "focus:ring-blue-400"
                    }`}
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mb-2">{errors.email}</p>
                )}

                {/* Password (sends as passwordHash) */}
                <input
                    type="password"
                    name="passwordHash"
                    placeholder="Password"
                    value={form.passwordHash}
                    onChange={handleChange}
                    className={`w-full mb-2 p-2 border rounded focus:ring-2 outline-none ${
                        errors.passwordHash
                            ? "border-red-400 focus:ring-red-300"
                            : "focus:ring-blue-400"
                    }`}
                />
                {errors.passwordHash && (
                    <p className="text-red-500 text-xs mb-2">{errors.passwordHash}</p>
                )}

                {/* Phone */}
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full mb-2 p-2 border rounded focus:ring-2 outline-none ${
                        errors.phone
                            ? "border-red-400 focus:ring-red-300"
                            : "focus:ring-blue-400"
                    }`}
                />
                {errors.phone && (
                    <p className="text-red-500 text-xs mb-2">{errors.phone}</p>
                )}

                {/* General error */}
                {errors.general && (
                    <p className="text-red-500 text-sm mb-3 text-center">
                        {errors.general}
                    </p>
                )}

                {/* Success message */}
                {success && (
                    <p className="text-green-600 text-sm mb-3 text-center">
                        Registration successful! Redirecting...
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="text-sm mt-4 text-center text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
