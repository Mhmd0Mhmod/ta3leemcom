import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/AuthReducer.js";

export const store = configureStore({
  reducer: {
    Auth: authReducer,
  },
});
