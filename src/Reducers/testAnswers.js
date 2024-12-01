import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  answers: {},
};
const testAnswers = createSlice({
  initialState,
  name: "testAnswers",
  reducers: {
    setAnswers: (state, action) => {
      state.answers = [...action.payload];
    },
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
  },
});
export default testAnswers.reducer;
export const { setAnswers, setAnswer } = testAnswers.actions;
