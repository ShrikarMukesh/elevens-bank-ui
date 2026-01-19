import { useEffect, useState } from "react";
import { LoansService } from "../../api/loansService";
import AccountCard from "./AccountCard";

export default function Loans({ customerId }) {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            if (!customerId) return;
            try {
                const response = await LoansService.getMyLoans(customerId);
                setLoans(response.data);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Failed to load loans:", err);
            }
        };
        fetchLoans();
    }, [customerId]);

    return (
        <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">Loans</h2>
            <div className="grid grid-cols-3 gap-4">
                {loans && loans.length > 0 ? (
                    loans.map((loan) => (
                        <AccountCard
                            key={loan.id}
                            title={`Loan #${loan.id} (${loan.status})`}
                            subtitle={`Amount: ₹ ${loan.amount?.toLocaleString()}`}
                            action={`Rate: ${loan.interestRate}%`}
                            color="from-orange-700 to-red-700"
                        />
                    ))
                ) : (
                    <p className="col-span-3 text-gray-400">No loans found.</p>
                )}
            </div>
        </div>
    );
}
