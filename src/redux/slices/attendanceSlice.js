import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStudentsApi, addStudentApi, updateStudentApi, deleteStudentApi } from '../../api/attendanceApi';


export const fetchStudents = createAsyncThunk(
  'attendance/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getStudentsApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addStudent = createAsyncThunk(
  'attendance/addStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await addStudentApi(studentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  'attendance/updateStudent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateStudentApi(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'attendance/deleteStudent',
  async (id, { rejectWithValue }) => {
    try {
      await deleteStudentApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  students: [],
  loading: false,
  error: null,
  selectedDate: new Date().toISOString().split('T')[0],
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = Array.isArray(action.payload) ? action.payload : [];
        if (!Array.isArray(action.payload)) {
          state.error = "Data format error: Expected an array of students.";
        }
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((s) => s.id !== action.payload);
      });
  },
});

export const { setSelectedDate } = attendanceSlice.actions;
export default attendanceSlice.reducer;
