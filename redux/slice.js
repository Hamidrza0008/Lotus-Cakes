import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find((p) => p.id === item.id);
            console.log(item)

            if (existingItem) {
                existingItem.quantity += 1;
            }

            else {
                state.cartItems.push({ ...item, quantity: 1 })
            }

            console.log(state.cartItems);

        },

        removeFromCart: (state, action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find((p) => p.id === item.id);
            console.log(item)

            if (existingItem) {
                existingItem.quantity -= 1;
            }

            else {
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);

            }

            console.log(state.cartItems);
        }

        ,

        decreaseQuantity: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((p) => p.id === item.id);
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;

            }
            else {
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);

            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        }



    }

})

export const { addToCart, removeFromCart, decreaseQuantity , clearCart } = cartSlice.actions;
export default cartSlice.reducer;