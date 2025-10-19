// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import {getCustomerById, verifyCustomerKYC} from "../api/customerService";

export default function Profile() {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ Replace this with dynamic value (from auth context or localStorage)
    const customerId = "CUST12345";

    useEffect(() => {
        async function fetchCustomer() {
            try {
                const data = await getCustomerById(customerId);
                setCustomer(data);
            } catch (err) {
                console.error("Failed to fetch customer:", err);
                setError("Unable to load customer data");
            } finally {
                setLoading(false);
            }
        }
        fetchCustomer();
    }, [customerId]);

    if (loading) return <div className="p-6 text-gray-600">Loading profile...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    if (!customer) return <div className="p-6">No customer data available</div>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-blue-700">👤 Customer Profile</h2>

            <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
                {/* ✅ Personal Information */}
                <section>
                    <h3 className="text-xl font-semibold text-blue-600 mb-3">
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong>Customer ID:</strong> {customer.customerId}</p>
                        <p><strong>User ID:</strong> {customer.userId}</p>
                        <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
                        <p><strong>Date of Birth:</strong> {customer.dob}</p>
                        <p><strong>Gender:</strong> {customer.gender}</p>
                        <p><strong>Status:</strong> {customer.status}</p>
                        <p><strong>Email:</strong> {customer.email}</p>
                    </div>
                </section>

                {/* ✅ Phone Numbers */}
                <section>
                    <h3 className="text-xl font-semibold text-blue-600 mb-3">
                        Phone Numbers
                    </h3>
                    <ul className="list-disc list-inside">
                        {customer.phoneNumbers?.map((phone, i) => (
                            <li key={i}>
                                {phone.type}: {phone.number}{" "}
                                {phone.primary && <span className="text-green-600 font-medium">(Primary)</span>}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* ✅ Addresses */}
                <section>
                    <h3 className="text-xl font-semibold text-blue-600 mb-3">
                        Addresses
                    </h3>
                    {customer.addresses?.map((addr, i) => (
                        <div
                            key={i}
                            className="border rounded-lg p-4 mb-3 bg-gray-50"
                        >
                            <p><strong>Type:</strong> {addr.type}</p>
                            <p><strong>Address:</strong> {addr.line1}</p>
                            <p><strong>City:</strong> {addr.city}</p>
                            <p><strong>State:</strong> {addr.state}</p>
                            <p><strong>Pincode:</strong> {addr.pincode}</p>
                            <p><strong>Country:</strong> {addr.country}</p>
                            {addr.primary && (
                                <p className="text-green-600 font-medium mt-1">(Primary)</p>
                            )}
                        </div>
                    ))}
                </section>

                {/* ✅ KYC Details */}
                <section>
                    <h3 className="text-xl font-semibold text-blue-600 mb-3">
                        KYC Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong>Aadhaar:</strong> {customer.kyc?.aadhaar}</p>
                        <p><strong>PAN:</strong> {customer.kyc?.pan}</p>
                        <p><strong>Passport:</strong> {customer.kyc?.passport}</p>
                        <p>
                            <strong>Verified:</strong>{" "}
                            {customer.kyc?.verified ? (
                                <span className="text-green-600 font-medium">Yes ✅</span>
                            ) : (
                                <span className="text-red-600 font-medium">No ❌</span>
                            )}
                        </p>
                        <button
                            onClick={() => verifyCustomerKYC(customer.customerId)}
                            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Verify KYC
                        </button>
                    </div>

                </section>

                {/* ✅ Preferences */}
                <section>
                    <h3 className="text-xl font-semibold text-blue-600 mb-3">
                        Preferences
                    </h3>
                    <p><strong>Language:</strong> {customer.preferences?.language}</p>
                    <p>
                        <strong>Notifications:</strong>{" "}
                        {customer.preferences?.notifications ? "Enabled" : "Disabled"}
                    </p>
                </section>

                {/* ✅ Created & Updated */}
                <section className="text-sm text-gray-500">
                    <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(customer.createdAt).toLocaleString()}
                    </p>
                    <p>
                        <strong>Updated At:</strong>{" "}
                        {new Date(customer.updatedAt).toLocaleString()}
                    </p>
                </section>
            </div>
        </div>
    );
}
