import React from 'react';
import { useSelector } from 'react-redux'; // Hook to access Redux store state
import { useGetAdminStatsQuery } from '../../../../redux/features/statsApi'; // API query hook to fetch admin statistics
import AdminStats from './AdminStats'; // Component to display summarized admin statistics
import AdminStatsChart from './AdminStatsChart'; // Component to display admin stats in chart form

const AdminDMain = () => {
    const { user } = useSelector((state) => state.auth); // Extracting authenticated user details from Redux store
    const { data: stats, error, isLoading } = useGetAdminStatsQuery(); // Query hook to fetch admin statistics data

    // Handle loading state
    if (isLoading) return <div>Loading...</div>;

    // Handle case where stats are not available
    if (!stats) return <div>No stats found</div>;

    // Handle error state
    if (error) return <div>Failed to load stats!</div>;

    return (
        <div className="p-6">
            {/* Admin Dashboard Header */}
            <div>
                <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
                <p className="text-gray-500">Hi, {user?.username}! Welcome to the admin dashboard.</p>
            </div>

            {/* Display admin statistics */}
            <AdminStats stats={stats} />

            {/* Display statistics in chart format */}
            <AdminStatsChart stats={stats} />
        </div>
    );
};

export default AdminDMain;
