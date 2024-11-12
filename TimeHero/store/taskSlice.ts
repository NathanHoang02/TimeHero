// src/features/task/taskSlice.ts
import { TaskDTO } from '@/constants/TaskDTO';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';


interface TaskState {
  tasks: TaskDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchAvailableTasks = createAsyncThunk('tasks/fetchAvailableTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/available`);
    return response.data as TaskDTO[];
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || 'Failed to fetch tasks');
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableTasks.fulfilled, (state, action: PayloadAction<TaskDTO[]>) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchAvailableTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const taskReducer = taskSlice.reducer;
