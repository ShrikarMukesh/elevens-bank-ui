export default function DashboardHeader() {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-semibold">Welcome, Shrikar</h1>
                <p className="text-sm text-gray-300">
                    Last logged in at 23/10/25, 03:48 PM
                </p>
            </div>

            <div className="bg-blue-700 rounded-xl px-4 py-2 text-sm shadow-md">
                🎁 Special offers for you!
            </div>
        </div>
    );
}
