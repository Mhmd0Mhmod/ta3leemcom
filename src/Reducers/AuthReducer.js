import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authStore = createSlice({
  name: "auth",
  initialState: {
    isLogin: !!Cookies.get("_auth"),
  },
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = authStore.actions;
export default authStore.reducer;

export const isLogin = (state) => state.Auth.isLogin;
