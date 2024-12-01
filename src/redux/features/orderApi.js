import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../utils/baseURL';

// Create an API slice for orders using RTK Query
const orderApi = createApi({
    // Set the reducer path for the API slice
    reducerPath: 'orderApi',

    // Configure the base query for making API requests
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`, // Base URL for the API
        credentials: 'include', // Include credentials (cookies) in the requests
    }),

    // Define tag types for managing cache invalidation
    tagTypes: ["Order"],

    // Define endpoints (API operations)
    endpoints: (builder) => ({
        // Query: Fetch orders by a specific email
        getOrdersByEmail: builder.query({
            query: (email) => ({
                url: `/${email}`, // Endpoint to fetch orders for a given email
                method: 'GET', // HTTP method
            }),
            providesTags: ['Order'], // Cache tag for this query
        }),

        // Query: Fetch a specific order by its ID
        getOrderById: builder.query({
            query: (orderId) => ({
                url: `/order/${orderId}`, // Endpoint to fetch an order by ID
                method: 'GET', // HTTP method
            }),
            providesTags: ['Order'], // Cache tag for this query
        }),

        // Query: Fetch all orders
        getAllOrders: builder.query({
            query: () => ({
                url: '', // Root endpoint for all orders
                method: 'GET', // HTTP method
            }),
            providesTags: ['Order'], // Cache tag for this query
        }),

        // Mutation: Update the status of an order
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/update-order-status/${id}`, // Endpoint to update an order by ID
                method: 'PATCH', // HTTP method for partial updates
                body: { status }, // Request body containing the new status
            }),
            invalidatesTags: ['Order'], // Invalidate the cache after mutation
        }),

        // Mutation: Delete an order by ID
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/delete-order/${id}`, // Endpoint to delete an order by ID
                method: 'DELETE', // HTTP method
            }),
            invalidatesTags: ['Order'], // Invalidate the cache after mutation
        }),
    }),
});

// Export hooks for using the API endpoints in components
export const {
    useGetOrdersByEmailQuery,      // Hook for fetching orders by email
    useGetOrderByIdQuery,          // Hook for fetching an order by ID
    useGetAllOrdersQuery,          // Hook for fetching all orders
    useUpdateOrderStatusMutation,  // Hook for updating an order status
    useDeleteOrderMutation,        // Hook for deleting an order
} = orderApi;

// Export the API slice
export default orderApi;
