import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const plant = action.payload;
      const existing = state.items.find((item) => item.id === plant.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalAmount += plant.price;
    },

    removeItem(state, action) {
      const id = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (!existing) return;
      state.totalQuantity -= existing.quantity;
      state.totalAmount -= existing.price * existing.quantity;
      state.items = state.items.filter((item) => item.id !== id);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (!existing) return;

      if (quantity <= 0) {
        state.totalQuantity -= existing.quantity;
        state.totalAmount -= existing.price * existing.quantity;
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }

      const diff = quantity - existing.quantity;
      existing.quantity = quantity;
      state.totalQuantity += diff;
      state.totalAmount += diff * existing.price;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
