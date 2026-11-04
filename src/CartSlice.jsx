import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, { payload: plant }) {
      if (!state.items.some((item) => item.id === plant.id)) {
        state.items.push({ ...plant, quantity: 1 });
      }
    },
    removeItem(state, { payload: id }) {
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateQuantity(state, { payload: { id, quantity } }) {
      if (!Number.isSafeInteger(quantity)) return;
      const item = state.items.find((entry) => entry.id === id);
      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter((entry) => entry.id !== id);
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartQuantity = (state) =>
  selectCartItems(state).reduce((sum, item) => sum + item.quantity, 0);
export const selectCartAmount = (state) =>
  selectCartItems(state).reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

export default CartSlice.reducer;
