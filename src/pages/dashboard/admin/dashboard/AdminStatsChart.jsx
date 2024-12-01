import React from 'react';
import { Pie, Line } from 'react-chartjs-2'; // Import Pie and Line chart components from react-chartjs-2
import 'chart.js/auto'; // Automatically import chart.js settings for compatibility

const AdminStatsChart = ({ stats }) => {
    console.log(stats); // Log stats for debugging purposes

    // Data for the Pie Chart
    const pieData = {
        labels: ['Total Orders', 'Total Products', 'Total Reviews', 'Total Users'], // Labels for the chart
        datasets: [
            {
                label: 'Admin Stats', // Dataset label
                data: [
                    stats?.totalOrders, // Total orders
                    stats?.totalProducts, // Total products
                    stats?.totalReviews, // Total reviews
                    stats?.totalUsers, // Total users
                ],
                backgroundColor: [
                    '#FF6384', // Colors for the slices
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                ],
                hoverBackgroundColor: [
                    '#FF6384', // Colors when a slice is hovered
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                ],
            },
        ],
    };

    // Initialize an array of 12 zeros for the monthly earnings data
    const data = new Array(12).fill(0);

    // Populate the correct months with earnings data
    stats?.monthlyEarnings.forEach((entry) => {
        data[entry.month - 1] = entry.earnings; // Subtract 1 from the month for zero-based indexing
    });

    // Data for the Line Chart
    const lineData = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ], // Labels for each month
        datasets: [
            {
                label: 'Monthly Earnings', // Label for the dataset
                data, // Monthly earnings data
                fill: false, // No fill under the line
                backgroundColor: '#36A2EB', // Point color
                borderColor: '#36A2EB', // Line color
                tension: 0.1, // Smoothness of the line
            },
        ],
    };

    // Options for the charts
    const options = {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false, // Allow flexible height and width
    };

    return (
        <div className="mt-12 space-y-12">
            {/* Header for the stats overview */}
            <h2 className="text-xl font-semibold mb-4">Admin Stats Overview</h2>

            {/* Grid layout for the charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="max-h-96 md:h-96 w-full">
                    <Pie data={pieData} options={options} />
                </div>

                {/* Line Chart */}
                <div className="max-h-96 md:h-96 w-full">
                    <Line data={lineData} options={options} />
                </div>
            </div>

            {/* Footer */}
            <div>
                <p className="text-center">Made with Mamun</p>
            </div>
        </div>
    );
};

export default AdminStatsChart;
