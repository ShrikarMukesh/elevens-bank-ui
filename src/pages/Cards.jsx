import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardsService } from "../api/cardsService";
import useCustomer from "../hooks/useCustomer";
import AccountCard from "./dashboard/AccountCard";

// ✅ 1. Card List View
function CardsList() {
    const { customerId, loading: customerLoading, error: customerError } = useCustomer();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true); // Local loading for cards fetch
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCards = async () => {
            if (!customerId) return;
            try {
                const response = await CardsService.getMyCards(customerId);
                setCards(response.data);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Failed to load cards:", err);
            } finally {
                setLoading(false);
            }
        };

        if (customerId) {
            fetchCards();
        } else if (!customerLoading) {
            // If customer finished loading but no ID (error case), stop loading cards
            setLoading(false);
        }
    }, [customerId, customerLoading]);

    if (customerLoading) return <p className="p-6 text-gray-500">Loading customer profile...</p>;
    if (customerError) return <div className="p-6 text-red-600">Error loading profile: {customerError.message}</div>;
    if (loading) return <p className="p-6 text-gray-500">Loading cards...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">My Credit Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards && cards.length > 0 ? (
                    cards.map((card) => (
                        <div key={card.cardId} onClick={() => navigate(`${card.cardId}`)} className="cursor-pointer transition-transform hover:scale-105">
                            <AccountCard
                                title={`${card.cardType} (${card.network})`}
                                subtitle={`Limit: ₹ ${card.dailyLimit?.toLocaleString()}`}
                                action={`**** ${card.cardNumber?.slice(-4)}`}
                                color="from-blue-700 to-cyan-700"
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-3">No credit cards found.</p>
                )}
            </div>
        </div>
    );
}

// ✅ 2. Card Details View
function CardDetails() {
    const { cardId } = useParams();
    const { customerId } = useCustomer();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCardParams = async () => {
             // In a real app, you might fetch specific card details by ID. 
             // For now, we fetch all and find the one. 
             // Optimization: Add getCardById endpoint in Service if available.
             if(!customerId) return;
             
             try {
                 const response = await CardsService.getMyCards(customerId);
                 const found = response.data.find(c => c.cardId.toString() === cardId);
                 setCard(found);
             } catch(err) {
                 // eslint-disable-next-line no-console
                 console.error("Error fetching card details", err);
             } finally {
                 setLoading(false);
             }
        };
        fetchCardParams();
    }, [cardId, customerId]);


    if(loading) return <div className="p-6">Loading details...</div>;
    if(!card) return <div className="p-6">Card not found. <button onClick={() => navigate("..")} className="text-blue-500 underline">Go Back</button></div>;

    return (
        <div className="p-6">
            <button onClick={() => navigate("..")} className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-1">
                &larr; Back to Cards
            </button>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{card.cardType} Note</h2>
                <p className="text-gray-500 mb-6 uppercase tracking-wide">{card.network}</p>
                
                <div className="space-y-4">
                     <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Card Number</span>
                        <span className="font-mono font-medium">{card.cardNumber}</span>
                     </div>
                     <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Daily Limit</span>
                        <span className="font-medium">₹ {card.dailyLimit?.toLocaleString()}</span>
                     </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Available Amount</span>
                        <span className="font-medium">₹ {card.amountUsed?.toLocaleString()}</span> {/* Assuming amountUsed/available logic */}
                     </div>
                </div>
            </div>
        </div>
    );
}

// ✅ 3. Main Routing Component
export default function Cards() {
    return (
        <Routes>
            <Route path="/" element={<CardsList />} />
            <Route path=":cardId" element={<CardDetails />} />
        </Routes>
    );
}