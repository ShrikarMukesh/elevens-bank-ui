import { Link, useNavigate } from "react-router-dom";

export default function ErrorPage({ error = "404", message = "Page Not Found" }) {
    const navigate = useNavigate();

    const errorMessages = {
        "404": {
            title: "Page Not Found",
            description: "The page you're looking for doesn't exist or has been moved.",
            icon: (
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        "500": {
            title: "Server Error",
            description: "Something went wrong on our end. We're working to fix it.",
            icon: (
                <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        "403": {
            title: "Access Denied",
            description: "You don't have permission to access this resource.",
            icon: (
                <svg className="w-16 h-16 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        }
    };

    const currentError = errorMessages[error] || {
        title: message,
        description: "An unexpected error occurred.",
        icon: errorMessages["404"].icon
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-lg w-full text-center border border-blue-100">
                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                    {currentError.icon}
                </div>

                {/* Error Code */}
                <h1 className="text-8xl font-bold text-gray-300 mb-4">
                    {error}
                </h1>

                {/* Error Title */}
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {currentError.title}
                </h2>

                {/* Error Description */}
                <p className="text-gray-600 mb-8 text-lg">
                    {currentError.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                        ← Go Back
                    </button>
                    <Link
                        to="/dashboard"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Go to Dashboard
                    </Link>
                </div>

                {/* Help Text */}
                <div className="mt-8 text-sm text-gray-500">
                    <p>Need help? <Link to="/support" className="text-blue-600 hover:underline">Contact Support</Link></p>
                </div>
            </div>
        </div>
    );
}
