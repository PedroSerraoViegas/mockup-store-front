import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart-slice";
import loginReducer from "./slices/login-slice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer,
  },
});

export default store;
