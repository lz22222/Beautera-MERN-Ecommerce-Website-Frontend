import React from 'react';

// Component to display summarized admin statistics
const AdminStats = ({ stats }) => {
    console.log(stats); // Logging stats for debugging purposes

    return (
        <div className="my-5 space-y-4">
            {/* Grid layout for stats cards */}
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
                {/* Card for Total Earnings */}
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer">
                    <h2 className="text-xl font-semibold mb-2">Total Earnings</h2>
                    <p className="text-2xl font-bold">{stats?.totalEarnings}</p>
                </div>

                {/* Card for All Orders */}
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer">
                    <h2 className="text-xl font-semibold mb-2">All Orders</h2>
                    <p className="text-2xl font-bold">{stats?.totalOrders}</p>
                </div>

                {/* Card for All Users */}
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer">
                    <h2 className="text-xl font-semibold mb-2">All Users</h2>
                    <p className="text-2xl font-bold">{stats?.totalUsers}</p>
                </div>

                {/* Card for Total Products */}
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-200 cursor-pointer">
                    <h2 className="text-xl font-semibold mb-2">Total Products</h2>
                    <p className="text-2xl font-bold">{stats?.totalProducts}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;
