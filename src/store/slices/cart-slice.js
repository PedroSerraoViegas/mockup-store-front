import { createSlice } from "@reduxjs/toolkit";
import { addItem, removeItem, clearCart } from "../reducers/cart-reducers";

const initialCartState = {
  products: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem,
    removeItem,
    clearCart,
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
