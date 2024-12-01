import React from 'react';
import { useSelector } from 'react-redux'; // Importing useSelector to access Redux store state
import { useGetReviewsByUserIdQuery } from '../../../redux/features/reviewsApi'; // Custom hook for fetching user reviews from API
import { useNavigate } from 'react-router-dom'; // useNavigate for programmatic navigation

const UserReviews = () => {
    const { user } = useSelector((state) => state.auth); // Extracting the authenticated user details from Redux store
    const { data: reviews, error, isLoading } = useGetReviewsByUserIdQuery(user?._id); // Fetching reviews for the current user using their ID
    const navigate = useNavigate(); // Hook for navigation within the application

    // If reviews are still loading, display a loading message
    if (isLoading) return <div>Loading...</div>;

    // If there is an error in fetching reviews, display an error message
    if (error) return <div>Failed to load reviews!</div>;

    // Function to handle click on the "Add New Review" card
    const handleCardClick = () => {
        navigate('/shop'); // Navigate to the shop page
    };

    return (
        <div className='py-6'>
            {/* Section heading */}
            <h2 className='text-2xl font-bold mb-8"'>Your given Reviews</h2>

            {/* Display reviews in a grid layout */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-6'>
                {
                    // Mapping through reviews and rendering each as a card
                    reviews && reviews.map((review, index) => (
                        <div 
                            key={index} 
                            className='bg-white shadow-md rounded-lg p-4 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-200'
                        >
                            {/* Display the rating of the review */}
                            <p className='text-lg font-semibold mb-2'>Rating: {review?.rating}</p>
                            
                            {/* Display the comment left by the user */}
                            <p className='mb-2'><strong>Comment:</strong> {review?.comment}</p>
                            
                            {/* Display the product ID associated with the review */}
                            <p className='text-sm text-gray-500'><strong>ProductId:</strong> {review?.productId}</p>
                            
                            {/* Display the date when the review was created */}
                            <p className='text-sm text-gray-500'><strong>Date:</strong> {new Date(review?.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                }

                {/* Card for adding a new review */}
                <div 
                    onClick={handleCardClick} 
                    className='bg-gray-100 text-black flex items-center justify-center rounded-lg p-6 border cursor-pointer hover:bg-primary hover:text-white transition-all duration-200'
                >
                    <span>+</span>
                    <p>Add New Review</p>
                </div>
            </div>
        </div>
    );
};

export default UserReviews;