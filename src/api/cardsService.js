import { cardsApi } from "./axios";

export const CardsService = {
    // Get all cards for the authenticated user
    getMyCards: (customerId) => cardsApi.get(`/cards/customer/${customerId}`),

    // Apply for a new card
    applyForCard: (cardData) => cardsApi.post("/cards/create", cardData),

    // Get card details
    getCardDetails: (cardId) => cardsApi.get(`/cards/${cardId}`),

    // Block a card
    blockCard: (cardId) => cardsApi.post(`/cards/${cardId}/block`),

    // Update card status (ADMIN only)
    updateCardStatus: (cardId, status) => cardsApi.post(`/cards/${cardId}/status`, { status }),

    // Activate a card
    activateCard: (cardId, pin) => cardsApi.post(`/cards/${cardId}/activate`, { pin }),

    // Reset card PIN
    resetPin: (cardId, oldPin, newPin) => cardsApi.post(`/cards/${cardId}/reset-pin`, { oldPin, newPin }),

    // Reissue a card (ADMIN only)
    reissueCard: (cardId) => cardsApi.post(`/cards/${cardId}/reissue`),
};
