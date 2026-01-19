import { useEffect, useState } from "react";
import { getAccountsByCustomer } from "../../api/accountService";
import { getTransactionsByAccount } from "../../api/transactionService";

export default function RecentTransactions({ customerId }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!customerId) return;
            try {
                // 1. Fetch all accounts for the customer
                const accounts = await getAccountsByCustomer(customerId);
                
                // 2. Fetch transactions for each account in parallel
                const promises = accounts.map(acc => getTransactionsByAccount(acc.accountId));
                const results = await Promise.all(promises);
                
                // 3. Flatten the array of arrays and sort by date (descending)
                // Assuming 'timestamp' or 'date' field exists. Using 'timestamp' as per DTO.
                const allTxns = results.flat().sort((a, b) => new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt));
                
                // 4. Take top 5
                setTransactions(allTxns.slice(0, 5));
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Failed to load transactions", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [customerId]);

    return (
        <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            {loading ? (
                <p className="text-gray-400 text-sm">Loading transactions...</p>
            ) : (
                <div className="space-y-3">
                    {transactions && transactions.length > 0 ? (
                        transactions.map((txn, index) => (
                            <div key={txn.transactionId || index} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                                <div>
                                    <p className="font-medium text-sm text-gray-800">{txn.description || "Transfer/Payment"}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(txn.timestamp || txn.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`font-semibold text-sm ${txn.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}>
                                    {txn.type === 'CREDIT' ? '+' : '-'} ₹{txn.amount?.toLocaleString()}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm">No recent transactions found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
