import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],           // [{ name, image, description, cost, category, quantity }]
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Called from handleAddToCart() in ProductList.jsx
    addItem(state, action) {
      const plant = action.payload;
      const existing = state.items.find((item) => item.name === plant.name);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
      state.totalQuantity += 1;
    },

    // Called from handleRemove() in CartItem.jsx — payload is the plant name
    removeItem(state, action) {
      const name = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (!existing) return;

      state.totalQuantity -= existing.quantity;
      state.items = state.items.filter((item) => item.name !== name);
    },

    // Called from handleIncrement / handleDecrement in CartItem.jsx
    // payload = { name, quantity }
    updateQuantity(state, action) {
      const { name, quantity } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (!existing) return;

      if (quantity <= 0) {
        state.totalQuantity -= existing.quantity;
        state.items = state.items.filter((item) => item.name !== name);
        return;
      }

      const diff = quantity - existing.quantity;
      existing.quantity = quantity;
      state.totalQuantity += diff;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
