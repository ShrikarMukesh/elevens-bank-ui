import { useEffect, useState } from "react";
import { getTransactionsByAccount } from "../api/transactionService";
import useAuth from "../hooks/useAuth"; // ✅ fixed import
import Loader from "../components/Loader";

export default function Transactions() {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const accountId = user?.accountId || 101; // replace with real accountId
                const data = await getTransactionsByAccount(accountId);
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, [user]);

    const filteredTransactions =
        filter === "ALL"
            ? transactions
            : transactions.filter((txn) => txn.transactionType === filter);

    if (loading) return <Loader />;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">🔄 Transaction History</h2>

            {/* Filters */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600 text-sm">
                    Showing {filteredTransactions.length} of {transactions.length} transactions
                </p>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                    <option value="ALL">All Types</option>
                    <option value="DEPOSIT">Deposit</option>
                    <option value="WITHDRAWAL">Withdrawal</option>
                    <option value="TRANSFER">Transfer</option>
                    <option value="PAYMENT">Payment</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">Txn ID</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Mode</th>
                        <th className="px-4 py-3">Amount (₹)</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((txn) => (
                            <tr
                                key={txn.transactionId}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-2 text-gray-800 font-medium">
                                    {txn.transactionId}
                                </td>
                                <td className="px-4 py-2">{txn.transactionType}</td>
                                <td className="px-4 py-2">{txn.transactionMode}</td>
                                <td className="px-4 py-2 font-semibold">
                                    ₹ {txn.amount.toLocaleString()}
                                </td>
                                <td
                                    className={`px-4 py-2 font-semibold ${
                                        txn.status === "SUCCESS"
                                            ? "text-green-600"
                                            : txn.status === "FAILED"
                                                ? "text-red-500"
                                                : "text-yellow-600"
                                    }`}
                                >
                                    {txn.status}
                                </td>
                                <td className="px-4 py-2 text-gray-600">{txn.description}</td>
                                <td className="px-4 py-2 text-gray-500 text-xs">
                                    {new Date(txn.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-6 text-gray-500">
                                No transactions found
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
