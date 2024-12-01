import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import authReducer from './features/auth/authSlice'
import authApi from './features/auth/authApi'
import productsApi from './features/products/productsApi'
import reviewsApi from './features/reviewsApi'
import ordersApi from './features/orderApi'
import statsApi from './features/statsApi'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [statsApi.reducerPath]: statsApi.reducer,
    },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			productsApi.middleware,
			reviewsApi.middleware,
            ordersApi.middleware,
            statsApi.middleware
		),
});
