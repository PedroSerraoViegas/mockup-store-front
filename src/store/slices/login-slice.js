import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../reducers/login-reducers";

const initialLoginState = {
  isLoggedIn: false,
  username: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    login,
    logout,
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
