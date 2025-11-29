import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getAccountsByCustomer } from "../../api/accountService";
import AccountCard from "./AccountCard";

export default function AccountCards() {
    const [showBalance, setShowBalance] = useState(false);
    const [accounts, setAccounts] = useState([]);

    const { user } = useAuth();
    const customerId = user?.userId || localStorage.getItem("userId");

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await getAccountsByCustomer(customerId);
                setAccounts(data);
            } catch (err) {
                console.error("Failed to load accounts:", err);
            }
        };
        fetchAccounts();
    }, [customerId]);

    // Helper function to make account type user-friendly
    const formatAccountType = (type) => {
        switch (type) {
            case "SAVINGS":
                return "Savings Account";
            case "CURRENT":
                return "Current Account";
            case "FIXED_DEPOSIT":
                return "Fixed Deposit";
            default:
                return type;
        }
    };

    return (
        <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Accounts</h2>
                <div className="flex items-center gap-2 text-sm">
                    <span>Show Balance</span>
                    <input
                        type="checkbox"
                        onChange={() => setShowBalance(!showBalance)}
                        className="accent-purple-600"
                    />
                </div>
            </div>

            {/* Account Cards Grid */}
            <div className="grid grid-cols-3 gap-4">
                {accounts && accounts.length > 0 ? (
                    accounts.map((acc) => (
                        <AccountCard
                            key={acc.accountId}
                            title={`${formatAccountType(acc.accountType)} (${acc.currency})`}
                            subtitle={
                                showBalance
                                    ? `₹ ${acc.balance.toLocaleString()}`
                                    : "XXXXXXXXX"
                            }
                            action={`A/C No: ${acc.accountNumber}`}
                            color={
                                acc.accountType === "SAVINGS"
                                    ? "from-green-600 to-green-800"
                                    : acc.accountType === "CURRENT"
                                        ? "from-blue-600 to-blue-800"
                                        : "from-purple-700 to-pink-700"
                            }
                        />
                    ))
                ) : (
                    <p className="col-span-3 text-gray-400">No accounts found.</p>
                )}
            </div>
        </div>
    );
}
