// Import necessary modules for creating an API
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../utils/baseURL'

// Create an API for managing reviews
export const reviewsApi = createApi({
	reducerPath: 'reviewApi', // Defines the API reducer path
	baseQuery: fetchBaseQuery({
		baseUrl: `${getBaseUrl()}/api/reviews`, // Base URL for the reviews API
		credentials: 'include', // Includes credentials like cookies in requests
	}),
	tagTypes: ['Reviews'], // Defines tags for cache invalidation

	endpoints: (builder) => ({
		// Mutation for posting a new review
		postReview: builder.mutation({
			query: (reviewData) => ({
				url: '/post-review', // Endpoint to post a review
				method: 'POST', // HTTP method
				body: reviewData, // Payload containing review data
			}),
			invalidatesTags: (result, error, { postId }) => [
				{ type: 'Reviews', id: postId }, // Invalidates cache for the specific post
			],
		}),
		// Query to get the total count of reviews
		getReviewsCount: builder.query({
			query: () => ({
				url: '/total-reviews', // Endpoint to fetch total reviews
			}),
		}),
		// Query to fetch reviews by a specific user ID
		getReviewsByUserId: builder.query({
			query: (userId) => ({
				url: `/${userId}`, // Endpoint to fetch reviews by user ID
			}),
			providesTags: (result) =>
				result ? [{ type: 'Reviews', id: result[0]?.email }] : [], // Tags the result for cache updates
		}),
	}),
})

// Export hooks for using the defined endpoints
export const {
	usePostReviewMutation,
	useGetReviewsCountQuery,
	useGetReviewsByUserIdQuery,
} = reviewsApi

// Export the reviews API for integration in the store
export default reviewsApi
