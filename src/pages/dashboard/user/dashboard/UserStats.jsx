import React from 'react'

// Functional component to display user statistics
const UserStats = ({stats}) => {
  return (
    <div className='my-5 space-y-4'>
        {/* Grid container for statistics cards */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1'>
            {/* Total Payments Card */}
            <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
                {/* Title for the statistic */}
                <h2 className='text-xl font-semibold mb-2'>Total Payments</h2>
                {/* Display the value */}
                <p className='text-2xl font-bold'>${stats?.totalPayments}</p>
            </div>
            {/* Total Reviews Card */}
            <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>Total Reviews</h2>
                <p className='text-2xl font-bold'>{stats?.totalReviews}</p>
            </div>
            {/* Total Purchased Products Card */}
            <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
                <h2 className='text-xl font-semibold mb-2'>Total Purchased Products</h2>
                <p className='text-2xl font-bold'>{stats?.totalPurchasedProducts}</p>
            </div>
        </div>
    </div>
  )
}

export default UserStats;
