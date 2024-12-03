// src/features/task/taskSlice.ts
import { TaskDTO } from "@/constants/TaskDTO";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { makeApiCall } from "../apiClient";

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

export const fetchAvailableTasks = createAsyncThunk(
  "tasks/fetchAvailableTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeApiCall.get(`tasks/available`);

      console.log("response", response)
      return response as TaskDTO[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch tasks"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAvailableTasks.fulfilled,
        (state, action: PayloadAction<TaskDTO[]>) => {

          console.log("payload", action.payload)
          state.tasks = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAvailableTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const taskReducer = taskSlice.reducer;
