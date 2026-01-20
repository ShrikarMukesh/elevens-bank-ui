import {
    DashboardHeader,
    DashboardTabs,
    AccountCards,
    CreditCards,
    Loans,
    RecentTransactions,
    FavouriteLinks,
    SendMoneyForm,
} from "../pages/dashboard";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getCustomerByUserId } from "../api/customerService";

export default function Dashboard() {
    const { user } = useAuth();
    const [customerId, setCustomerId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            if (!user?.userId) return;
            try {
                // Fetch the real customerId (e.g., ELEVEN...) using the login userId
                const profile = await getCustomerByUserId(user.userId);
                setCustomerId(profile.customerId);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error("Failed to fetch customer profile for dashboard:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [user?.userId]);

    // Optional: Show a loader or partial state while fetching ID
    if (loading) {
         return <div className="p-6 text-gray-500">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-6">
            <DashboardHeader />
            <DashboardTabs />

            <div className="grid grid-cols-3 gap-6 mt-6">
                <div className="col-span-2 space-y-6">
                    <AccountCards customerId={customerId} />
                    <CreditCards customerId={customerId} />
                    <Loans customerId={customerId} />
                    <SendMoneyForm />
                </div>
                <div className="space-y-6">
                    <FavouriteLinks />
                    <RecentTransactions customerId={customerId} />
                </div>
            </div>
        </div>
    );
}
