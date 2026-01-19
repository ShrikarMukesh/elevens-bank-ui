import { cardsApi } from "./axios";

export const CardsService = {
    // Get all cards for the authenticated user
    getMyCards: (customerId) => cardsApi.get(`/cards/customer/${customerId}`),

    // Apply for a new card
    applyForCard: (cardData) => cardsApi.post("/create", cardData),

    // Get card details
    getCardDetails: (cardId) => cardsApi.get(`/${cardId}`),

    // Block/Unblock a card
    toggleCardStatus: (cardId, status) => cardsApi.put(`/${cardId}/status`, { status }),

    // Report lost/stolen (might differ based on backend implementation)
    reportLostCard: (cardId) => cardsApi.post(`/${cardId}/report-lost`),

    // Set card spending limits
    setLimits: (cardId, limits) => cardsApi.put(`/${cardId}/limits`, limits)
};
