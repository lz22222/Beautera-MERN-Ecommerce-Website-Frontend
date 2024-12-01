import React, { useState } from 'react';
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../../redux/features/orderApi';
import { formatDate } from '../../../../utils/formateDate';
import { Link } from 'react-router-dom';
import UpdateOrderModal from './UpdateOrderModal';

const ManageOrders = () => {
    // Fetch all orders using the custom query hook from Redux Toolkit
    const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();

    // State to track the selected order for editing
    const [selectedOrder, setSelectedOrder] = useState(null);

    // State to manage the visibility of the UpdateOrderModal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Mutation hook for deleting an order
    const [deleteOrder] = useDeleteOrderMutation();

    // Handle the "Edit" button click, opening the modal
    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    // Close the modal and reset the selected order
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    // Handle the "Delete" button click, deleting the order
    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId).unwrap();
            alert('Order deleted successfully');
            refetch(); // Refetch orders after successful deletion
        } catch (error) {
            console.error('Failed to delete order:', error);
        }
    };

    // Render a loading state while fetching data
    if (isLoading) return <div>Loading....</div>;

    // Render an error state if fetching fails
    if (error) return <div>Something went wrong!</div>;

    return (
        <div className="section__container p-6">
            {/* Page heading */}
            <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>

            {/* Orders table */}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 border-b">Order Id</th>
                        <th className="py-3 px-4 border-b">Customer</th>
                        <th className="py-3 px-4 border-b">Status</th>
                        <th className="py-3 px-4 border-b">Date</th>
                        <th className="py-3 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders &&
                        orders.map((order, index) => (
                            <tr key={index}>
                                {/* Display order details */}
                                <td className="py-3 px-4 border-b">{order?.orderId}</td>
                                <td className="py-3 px-4 border-b">{order?.email}</td>
                                <td className="py-3 px-4 border-b">
                                    {/* Status badge with dynamic color */}
                                    <span
                                        className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(
                                            order?.status
                                        )}`}
                                    >
                                        {order?.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4 border-b">{formatDate(order?.updatedAt)}</td>
                                <td className="py-3 px-4 border-b flex items-center space-x-4">
                                    {/* Action buttons: View, Edit, Delete */}
                                    <Link to="#" className="text-blue-500 hover:underline">
                                        View
                                    </Link>
                                    <button
                                        className="text-green-500 hover:underline"
                                        onClick={() => handleEditOrder(order)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDeleteOrder(order?._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Update order modal */}
            {selectedOrder && (
                <UpdateOrderModal
                    order={selectedOrder}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

// Helper function to get the appropriate CSS class for the status badge
const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500';
        case 'processing':
            return 'bg-blue-500';
        case 'shipped':
            return 'bg-green-500';
        case 'completed':
            return 'bg-gray-500';
        default:
            return 'bg-gray-300';
    }
};

export default ManageOrders;
