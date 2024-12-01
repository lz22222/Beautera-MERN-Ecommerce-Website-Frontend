// Import necessary modules and functions for creating an API
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../utils/baseURL";

// Create an API for fetching user and admin statistics
const statsApi = createApi({
    reducerPath: "statsApi", // Specifies the reducer path for the API
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/stats`, // Sets the base URL for API requests
        credentials: "include", // Includes credentials like cookies in the request
    }),
    tagTypes: ["Stats"], // Defines tags for cache invalidation
    endpoints: (builder) => ({
        // Endpoint to fetch statistics for a specific user by email
        getUserStats: builder.query({
            query: (email) => `/user-stats/${email}`, // API path for user stats
            providesTags: ["Stats"], // Tags this query result for cache updates
        }),
        // Endpoint to fetch admin statistics
        getAdminStats: builder.query({
            query: () => `/admin-stats`, // API path for admin stats
            providesTags: ["Stats"], // Tags this query result for cache updates
        }),
    }),
});

// Export hooks for using the endpoints in components
export const { useGetUserStatsQuery, useGetAdminStatsQuery } = statsApi;

// Export the statsApi for integration in the store
export default statsApi;
