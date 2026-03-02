import { configureStore } from '@reduxjs/toolkit';
import attendanceReducer from './slices/attendanceSlice';

export const store = configureStore({
  reducer: {
    attendance: attendanceReducer,
  },
});
