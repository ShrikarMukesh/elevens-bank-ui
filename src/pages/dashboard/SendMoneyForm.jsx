import { useEffect, useState } from "react";
import { getAccountsByCustomer, transferFunds } from "../../api/accountService";

export default function SendMoneyForm() {
    const [accounts, setAccounts] = useState([]);
    const [fromAccount, setFromAccount] = useState("");
    const [toAccount, setToAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const customerId = "CUST12345"; // later from AuthContext

    useEffect(() => {
        const loadAccounts = async () => {
            try {
                const data = await getAccountsByCustomer(customerId);
                setAccounts(data.filter((a) => a.status === "ACTIVE"));
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Failed to load accounts:", err);
            }
        };
        loadAccounts();
    }, [customerId]);

    const handleTransfer = async (e) => {
        e.preventDefault();

        if (!fromAccount || !toAccount || !amount) {
            setMessage("⚠️ Please fill all fields.");
            return;
        }
        if (fromAccount === toAccount) {
            setMessage("❌ Cannot transfer to the same account.");
            return;
        }

        const payload = {
            fromAccountId: parseInt(fromAccount),
            toAccountId: parseInt(toAccount),
            amount: parseFloat(amount),
        };

        try {
            setLoading(true);
            const res = await transferFunds(payload);
            setMessage(`✅ ${res.message || "Transfer successful"}`);
            setAmount("");
            setFromAccount("");
            setToAccount("");
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            setMessage("❌ Transfer failed. Please check balance or try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white text-black p-4 rounded-2xl shadow-lg col-span-2">
            <h3 className="text-lg font-semibold mb-4">Transfer Between Own Accounts</h3>

            <form onSubmit={handleTransfer}>
                <div className="grid grid-cols-4 gap-4">
                    <select
                        className="border p-2 rounded"
                        value={fromAccount}
                        onChange={(e) => setFromAccount(e.target.value)}
                    >
                        <option value="">From Account</option>
                        {accounts.map((acc) => (
                            <option key={acc.accountId} value={acc.accountId}>
                                {acc.accountNumber} ({acc.accountType})
                            </option>
                        ))}
                    </select>

                    <select
                        className="border p-2 rounded"
                        value={toAccount}
                        onChange={(e) => setToAccount(e.target.value)}
                    >
                        <option value="">To Account</option>
                        {accounts.map((acc) => (
                            <option key={acc.accountId} value={acc.accountId}>
                                {acc.accountNumber} ({acc.accountType})
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Amount (₹)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border p-2 rounded"
                        min="1"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`${
                            loading ? "bg-gray-400" : "bg-purple-700 hover:bg-purple-800"
                        } text-white px-6 py-2 rounded-lg transition`}
                    >
                        {loading ? "Processing..." : "Transfer"}
                    </button>
                </div>
            </form>

            {message && (
                <div
                    className={`mt-4 p-2 text-sm rounded ${
                        message.startsWith("✅")
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
}
