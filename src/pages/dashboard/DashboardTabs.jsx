export default function DashboardTabs() {
    const tabs = ["Accounts", "Cards", "FD/RD", "Loans", "Invest", "Insure"];
    return (
        <div className="flex gap-4 text-sm mt-4">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className="bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
