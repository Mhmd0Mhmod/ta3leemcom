import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  mark: 0,
  startDate: null,
  type: "",
  bonus: 0,
  teacherId: null,
  groupIds: [],
  compulsory: 0,
  questions: [],
  timeDuration: {},
};
const testReducer = createSlice({
  name: "test",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setTeacherId: (state, action) => {
      state.teacherId = action.payload;
    },
    setGroupIds: (state, action) => {
      state.groupIds = action.payload;
    },
    setQuestions: (state, action) => {
      const question = { ...action.payload, id: state.questions.length + 1 };
      if (action.payload.compulsory) {
        state.mark += Number(action.payload.mark);
      } else {
        state.bonus += Number(action.payload.mark);
      }
      state.questions.push(question);
    },
    setTimeDuration: (state, action) => {
      state.timeDuration = action.payload;
    },
    editQuestion(state, action) {
      const index = state.questions.findIndex((question) => question.id === action.payload.id);
      console.log(action.payload);

      state.questions[index] = action.payload;
    },
    deleteQuestion(state, action) {
      const index = state.questions.findIndex((question) => question.id === action.payload);
      state.questions.splice(index, 1);
    },
  },
});

export default testReducer.reducer;
export const { setTitle, setStartDate, setType, setTeacherId, setGroupIds, setQuestions, setTimeDuration, setTimeStart, editQuestion, deleteQuestion } = testReducer.actions;
export const selectTest = (state) => state.test;
export const selectTitle = (state) => state.test.title;
