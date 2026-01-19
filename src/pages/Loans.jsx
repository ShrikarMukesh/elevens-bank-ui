import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoansService } from "../api/loansService";
import useCustomer from "../hooks/useCustomer";
import AccountCard from "./dashboard/AccountCard";

// ✅ 1. Loans List View
function LoansList() {
    const { customerId, loading: customerLoading, error: customerError } = useCustomer();
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoans = async () => {
            if (!customerId) return;
            try {
                const response = await LoansService.getMyLoans(customerId);
                setLoans(response.data);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Failed to load loans:", err);
            } finally {
                setLoading(false);
            }
        };

        if (customerId) {
            fetchLoans();
        } else if (!customerLoading) {
            setLoading(false);
        }
    }, [customerId, customerLoading]);

    if (customerLoading) return <p className="p-6 text-gray-500">Loading customer profile...</p>;
    if (customerError) return <div className="p-6 text-red-600">Error loading profile: {customerError.message}</div>;
    if (loading) return <p className="p-6 text-gray-500">Loading loans...</p>;

    return (
        <div className="p-6">
             <h2 className="text-2xl font-bold mb-6 text-blue-800">My Loans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loans && loans.length > 0 ? (
                    loans.map((loan) => (
                        <div key={loan.id} onClick={() => navigate(`${loan.id}`)} className="cursor-pointer transition-transform hover:scale-105">
                            <AccountCard
                                title={`Loan #${loan.id} (${loan.status})`}
                                subtitle={`Amount: ₹ ${loan.amount?.toLocaleString()}`}
                                action={`Rate: ${loan.interestRate}%`}
                                color="from-orange-700 to-red-700"
                            />
                        </div>
                    ))
                ) : (
                   <p className="text-gray-500 col-span-3">No loans found.</p>
                )}
            </div>
        </div>
    );
}

// ✅ 2. Loan Details View
function LoanDetails() {
    const { loanId } = useParams();
    const { customerId } = useCustomer();
    const [loan, setLoan] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
         const fetchLoanParams = async () => {
             if(!customerId) return;
             try {
                // Optimization: Add getLoanById endpoint in Service
                 const response = await LoansService.getMyLoans(customerId);
                 // Assuming loanId is number in backend but string in params
                 const found = response.data.find(l => l.id.toString() === loanId);
                 setLoan(found);
             } catch(err) {
                 // eslint-disable-next-line no-console
                 console.error("Error fetching loan details", err);
             } finally {
                 setLoading(false);
             }
        };
        fetchLoanParams();
    }, [loanId, customerId]);

    if(loading) return <div className="p-6">Loading details...</div>;
    if(!loan) return <div className="p-6">Loan not found. <button onClick={() => navigate("..")} className="text-blue-500 underline">Go Back</button></div>;

    return (
         <div className="p-6">
            <button onClick={() => navigate("..")} className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-1">
                &larr; Back to Loans
            </button>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Loan #{loan.id}</h2>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-6 ${loan.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {loan.status}
                </div>

                <div className="space-y-4">
                     <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Principal Amount</span>
                        <span className="font-medium">₹ {loan.amount?.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Interest Rate</span>
                        <span className="font-medium">{loan.interestRate}%</span>
                     </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Tenure</span>
                        <span className="font-medium">{loan.tenureMonths || "N/A"} months</span>
                     </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Applied On</span>
                        {/* Handling both appliedAt (if available) or createdAt */}
                        <span className="font-medium">{new Date(loan.appliedAt || loan.createdAt).toLocaleDateString()}</span>
                     </div>
                </div>
            </div>
        </div>
    );
}

// ✅ 3. Main Routing Component
export default function Loans() {
    return (
        <Routes>
            <Route path="/" element={<LoansList />} />
            <Route path=":loanId" element={<LoanDetails />} />
        </Routes>
    );
}
