import React, { useState } from 'react';
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orderApi';

const UpdateOrderModal = ({ order, isOpen, onClose }) => {
    // State to track the current status of the order
    const [status, setStatus] = useState(order?.status);

    // Mutation hook to handle updating the order status
    const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation();

    // Function to handle the status update when the "Update" button is clicked
    const handleUpdateOrderStatus = async () => {
        try {
            // Call the mutation with the order ID and new status
            await updateOrderStatus({ id: order?._id, status });
            onClose(); // Close the modal upon successful update
        } catch (error) {
            console.error('Failed to update order status:', error);
        }
    };

    // Return null if the modal is not open
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                {/* Modal Title */}
                <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>

                {/* Dropdown to select order status */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="status">
                        Status
                    </label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                    >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                {/* Error message if the update fails */}
                {error && <p className="text-red-500 mb-4">Failed to update status.</p>}

                {/* Modal action buttons */}
                <div className="flex justify-end space-x-2">
                    {/* Cancel button */}
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    {/* Update button */}
                    <button
                        onClick={handleUpdateOrderStatus}
                        disabled={isLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {isLoading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrderModal;
