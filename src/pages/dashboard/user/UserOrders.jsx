import React from 'react';
// Import Redux hook to access global state
import { useSelector } from 'react-redux';
// Import custom query hook for fetching orders by user email
import { useGetOrdersByEmailQuery } from '../../../redux/features/orderApi';
// Import Link component for navigation
import { Link } from 'react-router-dom';

const UserOrders = () => {
    // Get the current user details from Redux state
    const {user} = useSelector((state) => state.auth);

    // Fetch orders data using RTK Query with the user's email
    const {data: orderdata, error, isLoading} = useGetOrdersByEmailQuery(user?.email);
    const orders = orderdata?.orders; // Extract orders from API response
    console.log(orders); // Debug: Log orders to the console

    // Handle loading state
    if(isLoading) return <div>Loading...</div>;
    // Handle error state
    if(error) return <div>No order found!</div>;

    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
                {/* Main container for the order list */}
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    {/* Header section */}
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">Your Orders</h3>
                            </div>
                            {/* "See all" button */}
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
                            </div>
                        </div>
                    </div>

                    {/* Table container */}
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            {/* Table header */}
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">#</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Order ID</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Date</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Status</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Total</th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">View Order</th>
                                </tr>
                            </thead>

                            {/* Table body */}
                            <tbody>
                                {orders && orders.map((order, index) => (
                                    <tr key={index}>
                                        {/* Serial number */}
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">{index + 1}</th>
                                        {/* Order ID */}
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{order?.orderId}</td>
                                        {/* Order creation date */}
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {new Date(order?.createdAt).toLocaleDateString()}
                                        </td>
                                        {/* Order status with dynamic styling */}
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                           <span className={`p-1 rounded ${order?.status === 'completed' ? 'bg-green-100 text-green-700' : order?.status === 'pending' ? 'bg-red-100 text-red-700' : order?.status === 'processing' ? 'bg-blue-100 text-blue-600' : 'bg-indigo-100 text-indigo-600'}`}>{order?.status}</span>
                                        </td>
                                        {/* Order total amount */}
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{order?.amount}</td>
                                        {/* View order link */}
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          <Link to={`/orders/${order?._id}`} className='underline hover:text-primary'>view order</Link>
                                        </td>
                                    </tr> 
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Footer section */}
            <footer className="relative pt-8 pb-6 mt-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                            <div className="text-sm text-blueGray-500 font-semibold py-1">
                                Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
}

export default UserOrders;
