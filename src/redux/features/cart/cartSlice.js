import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	products: [],
	selectedItems: 0,
	totalPrice: 0,
	tax: 0,
	taxRate: 0.05,
	grandTotal: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {



		addToCart: (state, action) => {
			const productToAdd = action.payload;
		
			const productId = productToAdd._id || productToAdd.id;
			if (!productId) {
				console.error("Invalid product data:", productToAdd);
				return;
			}
		
			console.log("Product to add:", productToAdd);
			console.log("Product ID:", productId);
		
			const existingProduct = state.products.find(
				(product) => product._id === productId || product.id === productId
			);
		
			if (existingProduct) {
				existingProduct.quantity += 1;
				console.log(
					`Increased quantity of ${existingProduct.name} to ${existingProduct.quantity}`
				);
			} else {
				state.products.push({ ...productToAdd, _id: productId, quantity: 1 });
				console.log(`Added new product: ${productToAdd.name}`);
			}
		
			console.log("Current cart state after adding:", JSON.parse(JSON.stringify(state.products)));
		
			state.selectedItems = setSelectedItems(state);
			state.totalPrice = setTotalPrice(state);
			state.tax = setTax(state);
			state.grandTotal = setGrandTotal(state);
		},
		
		
		



		
		removeFromCart: (state, action) => {
			state.products = state.products.filter(
				(product) => product._id !== action.payload.id
			)
			state.selectedItems = setSelectedItems(state)
			state.totalPrice = setTotalPrice(state)
			state.tax = setTax(state)
			state.grandTotal = setGrandTotal(state)
		},




		updateQuantity: (state, action) => {
			const existingProductIndex = state.products.findIndex(
				(product) => product._id === action.payload.id
			);
		
			if (existingProductIndex >= 0) {
				const product = state.products[existingProductIndex];
				if (action.payload.type === 'increment') {
					product.quantity += 1;
				} else if (action.payload.type === 'decrement' && product.quantity > 1) {
					product.quantity -= 1;
				}
				console.log(`Updated quantity of ${product.name} to ${product.quantity}`);
			}
		
			state.selectedItems = setSelectedItems(state);
			state.totalPrice = setTotalPrice(state);
			state.tax = setTax(state);
			state.grandTotal = setGrandTotal(state);
		},




		clearCart: (state) => {
			state.products = []
			state.selectedItems = 0
			state.totalPrice = 0
			state.tax = 0
			state.grandTotal = 0
		},
	},
})

// utilities functions
export const setSelectedItems = (state) =>
	state.products.reduce((total, product) => {
		return Number(total + product.quantity)
	}, 0)

export const setTotalPrice = (state) =>
	state.products.reduce((total, product) => {
		return Number(total + product.quantity * product.price)
	}, 0)

export const setTax = (state) => Number(setTotalPrice(state) * state.taxRate)

export const setGrandTotal = (state) => {
	return setTotalPrice(state) + setTotalPrice(state) * state.taxRate
}

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
	cartSlice.actions
export default cartSlice.reducer