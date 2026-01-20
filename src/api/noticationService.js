import { notificationApi } from "./axios";

// Get all notifications
export const getNotificationsByCustomer = async (customerId) => {
    try {
        const response = await notificationApi.get(`/api/notifications/customer/${customerId}`);
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("❌ Error fetching notifications:", error);
        throw error;
    }
};

// Mark one notification as read
export const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await notificationApi.patch(`/api/notifications/${notificationId}/read`);
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("❌ Error marking notification as read:", error);
        throw error;
    }
};

// Mark all as read
export const markAllNotificationsAsRead = async (customerId) => {
    try {
        const response = await notificationApi.patch(`/api/notifications/customer/${customerId}/read-all`);
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("❌ Error marking all notifications as read:", error);
        throw error;
    }
};

// Delete a notification
export const deleteNotification = async (notificationId) => {
    try {
        await notificationApi.delete(`/api/notifications/${notificationId}`);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("❌ Error deleting notification:", error);
        throw error;
    }
};
