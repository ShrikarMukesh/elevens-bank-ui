import {
    DashboardHeader,
    DashboardTabs,
    AccountCards,
    FavouriteLinks,
    SendMoneyForm,
} from "../pages/dashboard";

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <DashboardHeader />
            <DashboardTabs />

            <div className="grid grid-cols-3 gap-6 mt-6">
                <div className="col-span-2 space-y-6">
                    <AccountCards />
                    <SendMoneyForm />
                </div>
                <FavouriteLinks />
            </div>
        </div>
    );
}
