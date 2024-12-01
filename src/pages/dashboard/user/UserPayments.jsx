import React from 'react';
// Redux hook to access global state
import { useSelector } from 'react-redux';
// Hook to fetch orders by email
import { useGetOrdersByEmailQuery } from '../../../redux/features/orderApi';

const UserPayments = () => {
    // Get the current user details from Redux state
    const {user} = useSelector((state) => state.auth);

    // Fetch orders using RTK Query, filtered by the user's email
    const {data: ordersdata, error, isLoading} = useGetOrdersByEmailQuery(user?.email);

    // Handle loading state
    if (isLoading) return <div>Loading....</div>;
    // Handle error state
    if (error) return <div>No order found!</div>;

    // Extract orders or set an empty object if none exist
    const orders = ordersdata.orders || {};
    // Calculate the total payment by summing up the `amount` of all orders
    const totalPayment = orders?.reduce((acc, order) => acc + order.amount, 0).toFixed(2);
    console.log(totalPayment); // Debug: Log the total payment

    return (
        <div className='py-6 px-4'>
            {/* Header for total payments */}
            <h3 className='text-xl font-semibold mb-4'>Total Payments</h3>
            <div>
                {/* Display total amount spent */}
                <p className='text-lg font-medium text-gray-800 mb-5'>
                    Total Spent: ${totalPayment ? totalPayment : 0}
                </p>
                {/* List of orders */}
                <ul>
                    {
                        // Iterate through each order and render details
                        orders && orders.map((item, index) => (
                            <li key={index}>
                                {/* Display order number */}
                                <h5 className='font-medium text-gray-800 mb-2'>Order #{index + 1}</h5>
                                <div>
                                    {/* Display order amount */}
                                    <span className='text-gray-600'>Order # ${item?.amount.toFixed(2)}</span>
                                </div>
                                {/* Display order date and status */}
                                <div className='flex md:flex-row items-center space-x-2'>
                                    <span className='text-gray-600'>Date: {new Date(item?.createdAt).toLocaleString()}</span>
                                    <p className='text-gray-600'>
                                       | Status: 
                                       <span className={`ml-2 py-[2px] px-2 text-sm rounded 
                                        ${item?.status === 'completed' 
                                            ? 'bg-green-100 text-green-700' 
                                            : item?.status === 'pending' 
                                            ? 'bg-red-200 text-red-700' 
                                            : item?.status === 'processing' 
                                            ? 'bg-yellow-100 text-yellow-700' 
                                            : 'bg-blue-200 text-blue-700' }`}>
                                           {item?.status}
                                       </span>
                                    </p>
                                </div>
                                {/* Divider between orders */}
                                <hr className='my-2'/>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default UserPayments;
