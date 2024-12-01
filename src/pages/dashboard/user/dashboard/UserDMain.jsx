import React from 'react';
// Redux hook to access global state
import { useSelector } from 'react-redux';
// Import the Bar chart component
import { Bar } from "react-chartjs-2";
// Import Chart.js core components and features
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
// Redux query hook to fetch user stats
import { useGetUserStatsQuery } from '../../../../redux/features/statsApi';
// Custom component for displaying detailed user stats
import UserStats from './UserStats';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserDMain = () => {
    // Retrieve the current user information from Redux state
    const {user} = useSelector((state) => state.auth);

    // Fetch user stats using RTK Query, depending on the user's email
    const {data: stats, error, isLoading} = useGetUserStatsQuery(user?.email);

    console.log(stats); // Debug: Log the fetched user stats

    // Display a loading message while data is being fetched
    if(isLoading) return <div className='text-center text-gray-500'>Loading...</div>;

    // If no stats are available, display a message to inform the user
    if(!stats) {
        return <div className='text-center text-gray-500'>No data available.</div>;
    }

    // Prepare data for the Bar chart
    const data = {
        labels: ['Total Payments', 'Total Reviews', 'Total Purchased Products'], // Labels for the X-axis
        datasets: [
            {
                label: 'User Stats', // Dataset label
                data: [stats.totalPayments, stats.totalReviews * 100, stats.totalPurchasedProducts * 100], // Y-axis data
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color for bars
                borderColor: 'rgba(75, 192, 192, 1)', // Border color for bars
                borderWidth: 1, // Border width for bars
            }
        ]
    };

    // Configuration options for the Bar chart
    const options= {
        responsive: true, // Ensure the chart is responsive
        plugins: {
          legend: {
            position: 'top', // Place the legend at the top
          },
          tooltip: {
            // Customize the tooltip
            callbacks: {
              label: function (tooltipItem) {
                  // Format the tooltip label
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
    };

    // Render the User Dashboard
    return (
        <div className='p-6'>
            {/* Header section */}
            <div>
                <h1 className='text-2xl font-semibold mb-4'>User Dashboard</h1>
                <p className='text-gray-500'>Hi, {user?.username}! Welcome to your user dashboard</p>
            </div>
            {/* Display detailed user stats */}
            <UserStats stats={stats}/>
            {/* Display the Bar chart */}
            <div className='mb-6'>
                <Bar data={data} options={options}/>
            </div>
        </div>
    );
};

export default UserDMain;
