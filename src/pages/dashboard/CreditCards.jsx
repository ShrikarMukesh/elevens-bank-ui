import { useEffect, useState } from "react";
import { CardsService } from "../../api/cardsService";

import AccountCard from "./AccountCard";

export default function CreditCards({ customerId }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            if (!customerId) return;
            try {
                const response = await CardsService.getMyCards(customerId);
                setCards(response.data);
            } catch (err) {
                console.error("Failed to load cards:", err); // eslint-disable-line no-console
            }
        };
        fetchCards();
    }, [customerId]);

    return (
        <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">Credit Cards</h2>
            <div className="grid grid-cols-3 gap-4">
                {cards && cards.length > 0 ? (
                    cards.map((card) => (
                        <AccountCard
                            key={card.cardId}
                            title={`${card.cardType} (${card.network})`}
                            subtitle={`Limit: ₹ ${card.dailyLimit?.toLocaleString()}`}
                            action={`**** ${card.cardNumber?.slice(-4)}`}
                            color="from-blue-700 to-cyan-700"
                        />
                    ))
                ) : (
                    <p className="col-span-3 text-gray-400">No cards found.</p>
                )}
            </div>
        </div>
    );
}
