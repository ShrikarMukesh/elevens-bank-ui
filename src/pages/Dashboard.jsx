export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-blue-600 text-white p-4 shadow-md">
                <h1 className="text-xl font-bold">🏦 Elevens Bank Dashboard</h1>
            </header>

            <main className="flex flex-1">
                <aside className="w-64 bg-white shadow-md p-4">
                    <ul className="space-y-2">
                        <li>Accounts</li>
                        <li>Transactions</li>
                        <li>Loans</li>
                        <li>Profile</li>
                    </ul>
                </aside>

                <section className="flex-1 p-6">
                    <h2 className="text-2xl font-semibold mb-4">Welcome back!</h2>
                    <p>Your account overview will appear here.</p>
                </section>
            </main>
        </div>
    );
}
