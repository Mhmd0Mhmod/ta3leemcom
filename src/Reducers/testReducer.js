import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

const initialState = {
  title: "",
  mark: 0,
  startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  type: "",
  bonus: 0,
  teacherId: null,
  groupsIds: [],
  questions: [],
  timeDuration: {
    hours: 0,
    minute: 0,
    days: 0,
    mode: "AM",
  },
};
const testReducer = createSlice({
  name: "test",
  initialState,
  reducers: {
    reset: (state) => {
      state.title = "";
      state.mark = 0;
      state.startDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");
      state.type = "";
      state.bonus = 0;
      state.teacherId = null;
      state.groupsIds = [];
      state.questions = [];
      state.timeDuration = {
        hours: 0,
        minute: 0,
        days: 0,
        mode: "AM",
      };
    },
    setTest: (state, action) => {
      if (!action.payload) return;

      const entries = Object.entries(action.payload);
      entries.forEach(([key, value]) => {
        state[key] = value;
      });
    },
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
    setGroupsIds: (state, action) => {
      state.groupsIds = action.payload;
    },
    setQuestions: (state, action) => {
      const question = { ...action.payload, id: state.questions.length + 1 };
      if (action.payload.type === "mandatory") {
        state.mark += Number(action.payload.mark);
      } else {
        state.bonus += Number(action.payload.mark);
      }
      state.questions.push(question);
    },
    setTimeDuration: (state, action) => {
      state.timeDuration = action.payload;
      state.timeDuration.mode = "AM";
    },
    editQuestion(state, action) {
      const index = state.questions.findIndex((question) => question.id === action.payload.id);
      state.questions[index] = action.payload;
    },
    deleteQuestion(state, action) {
      const index = state.questions.findIndex((question) => question.id === action.payload);
      state.questions.splice(index, 1);
    },
  },
});

export default testReducer.reducer;
export const { reset, setTest, setTitle, setStartDate, setType, setTeacherId, setGroupsIds, setQuestions, setTimeDuration, setTimeStart, editQuestion, deleteQuestion } =
  testReducer.actions;
export const selectTest = (state) => state.test;
export const selectTitle = (state) => state.test.title;
