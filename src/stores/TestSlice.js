import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  bounce: 0,
  groupsIds: [],
  mark: 0,
  questions: [],
  startDate: '',
  teacherId: '',
  timeDuration: '',
  timeStart: '',
  title: '',
  type: 'اونلاين',
};
const OnlineSlice = createSlice({
  name: 'test',
  initialState: {
    value: 0,
  },
  reducers: {},
});

export const {} = OnlineSlice.actions;
export default OnlineSlice.reducer;
