// redux/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity); 
      }
    },
    clearCart: () => []  
  },
});

export const { addToCart, updateQuantity ,clearCart} = cartSlice.actions;

export default configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
