import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  answers: [],
  id: null,
  isAttend: null,
  quizBounce: null,
  quizId: null,
  quizMark: null,
  studentBounce: null,
  studentMark: null,
  stuentName: null,
  submitAnswerTime: null,
};
const testAnswers = createSlice({
  initialState,
  name: "testAnswers",
  reducers: {
    setAnswers: (state, action) => {
      const entities = Object.entries(action.payload);
      entities.forEach(([key, value]) => {
        state[key] = value;
      });
    },
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
  },
});
export default testAnswers.reducer;
export const { setAnswers, setAnswer } = testAnswers.actions;
