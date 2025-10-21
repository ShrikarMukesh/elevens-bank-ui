// src/pages/Notifications.jsx
import { useEffect, useState } from "react";
import {
    getNotificationsByCustomer,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
} from "../api/noticationService";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("ALL");
    const [eventTypeFilter, setEventTypeFilter] = useState("ALL");

    const customerId = "CUST12345";

    useEffect(() => {
        loadNotifications();
    }, [customerId]);

    async function loadNotifications() {
        try {
            setLoading(true);
            const data = await getNotificationsByCustomer(customerId);
            setNotifications(data);
            setFilteredNotifications(data);
        } catch (err) {
            setError("Failed to load notifications.");
        } finally {
            setLoading(false);
        }
    }

    // 🔍 Filtering logic
    useEffect(() => {
        let filtered = [...notifications];
        if (priorityFilter !== "ALL") filtered = filtered.filter((n) => n.priority === priorityFilter);
        if (eventTypeFilter !== "ALL") filtered = filtered.filter((n) => n.eventType === eventTypeFilter);
        if (searchTerm.trim()) {
            filtered = filtered.filter(
                (n) =>
                    n.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    n.message.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredNotifications(filtered);
    }, [notifications, searchTerm, priorityFilter, eventTypeFilter]);

    // 🧭 UI Actions
    const handleMarkAllAsRead = async () => {
        await markAllNotificationsAsRead(customerId);
        loadNotifications();
    };

    const handleMarkAsRead = async (notificationId) => {
        await markNotificationAsRead(notificationId);
        loadNotifications();
    };

    const handleDelete = async (notificationId) => {
        if (window.confirm("Are you sure you want to delete this notification?")) {
            await deleteNotification(notificationId);
            loadNotifications();
        }
    };

    if (loading) return <div className="p-6 text-gray-600">Loading notifications...</div>;
    if (error) return <div className="p-6 text-red-600 font-semibold">{error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-blue-700">🔔 Notifications</h2>
                <button
                    onClick={handleMarkAllAsRead}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Mark All as Read
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 shadow rounded-lg mb-6 flex flex-wrap gap-4 items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="border rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="ALL">All Priorities</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>
                <select
                    value={eventTypeFilter}
                    onChange={(e) => setEventTypeFilter(e.target.value)}
                    className="border rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="ALL">All Event Types</option>
                    {[...new Set(notifications.map((n) => n.eventType))].map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Notification list */}
            <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                    <div className="text-gray-500 italic">No notifications found.</div>
                ) : (
                    filteredNotifications.map((n) => (
                        <div
                            key={n.id}
                            className={`p-4 rounded-lg shadow-md border relative ${
                                n.status === "READ"
                                    ? "bg-gray-100 border-gray-200"
                                    : "bg-blue-50 border-blue-200"
                            }`}
                        >
                            {/* Title & Status */}
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg text-gray-800">{n.subject}</h3>
                                <div className="flex gap-2">
                                    {n.status !== "READ" && (
                                        <button
                                            onClick={() => handleMarkAsRead(n.notificationId)}
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(n.notificationId)}
                                        className="text-xs text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-700 mb-2">{n.message}</p>

                            <div className="text-sm text-gray-500 flex flex-wrap gap-4">
                                <p><strong>Event:</strong> {n.eventType}</p>
                                <p><strong>Priority:</strong> {n.priority}</p>
                                <p><strong>Status:</strong> {n.status}</p>
                                <p><strong>Sent:</strong> {new Date(n.sentAt).toLocaleString()}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
