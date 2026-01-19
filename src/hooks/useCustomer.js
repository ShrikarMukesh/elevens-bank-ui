import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { getCustomerByUserId } from "../api/customerService";

/**
 * Custom hook to fetch the current customer's profile and ID.
 * Centralizes the logic of mapping userId -> customerId.
 */
export default function useCustomer() {
    const { user } = useAuth();
    const [customerId, setCustomerId] = useState(null);
    const [customerProfile, setCustomerProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchCustomerData = async () => {
            if (!user?.userId) {
                setLoading(false);
                return;
            }

            try {
                // Fetch full profile using the logged-in User ID
                const profile = await getCustomerByUserId(user.userId);
                
                if (isMounted) {
                    setCustomerProfile(profile);
                    setCustomerId(profile.customerId); // The UUID (e.g., ELEVEN7BEC)
                    setError(null);
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Failed to fetch customer in useCustomer:", err);
                if (isMounted) {
                    setError(err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchCustomerData();

        return () => {
            isMounted = false;
        };
    }, [user?.userId]);

    return { customerId, customerProfile, loading, error };
}
