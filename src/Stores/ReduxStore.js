import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/AuthReducer.js";
import testReducer from "../Reducers/testReducer.js";
import testAnswers from "../Reducers/testAnswers.js";
export const store = configureStore({
  reducer: {
    Auth: authReducer,
    test: testReducer,
    testAnswers: testAnswers,
  },
});
