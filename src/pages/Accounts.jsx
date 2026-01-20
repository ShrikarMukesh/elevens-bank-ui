import { useEffect, useState } from "react";
import { getAccountsByCustomer } from "../api/accountService";
import useCustomer from "../hooks/useCustomer";

export default function Accounts() {
    const { customerId, loading: customerLoading } = useCustomer();
    const [accounts, setAccounts] = useState([]);
    const [accountsLoading, setAccountsLoading] = useState(false);

    useEffect(() => {
        const fetchAccounts = async () => {
            if (!customerId) return;
            
            setAccountsLoading(true);
            try {
                // Fetch accounts using the dynamic customerId
                // eslint-disable-next-line no-console
                console.log("Fetching accounts for customer:", customerId);
                const data = await getAccountsByCustomer(customerId);
                setAccounts(data);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Error fetching accounts:", err);
            } finally {
                setAccountsLoading(false);
            }
        };

        fetchAccounts();
    }, [customerId]);

    const isLoading = customerLoading || accountsLoading;

    if (isLoading) {
        return <div className="p-6 text-gray-500">Loading accounts...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">💰 Your Accounts</h2>

            {accounts.length === 0 ? (
                <p>No accounts found.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {accounts.map((acc) => (
                        <div
                            key={acc.accountId}
                            className="bg-white shadow-md rounded-xl p-4 border border-gray-100 hover:shadow-lg transition"
                        >
                            <h3 className="font-semibold text-lg mb-2">
                                {acc.accountType} Account
                            </h3>
                            <p className="text-sm text-gray-500">
                                Account Number: <b>{acc.accountNumber}</b>
                            </p>
                            <p className="mt-2 text-gray-800 font-bold text-xl">
                                ₹ {acc.balance.toLocaleString()} {acc.currency}
                            </p>
                            <p
                                className={`mt-1 text-sm font-medium ${
                                    acc.status === "ACTIVE" ? "text-green-600" : "text-red-500"
                                }`}
                            >
                                Status: {acc.status}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
