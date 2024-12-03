import { TaskDTO } from "@/constants/TaskDTO";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { makeApiCall } from "../apiClient";
import { CompletionType } from "@/constants/CompletionType";
import { TaskType } from "@/constants/TaskType"; // Assuming TaskType is an enum or object

interface TaskState {
  tasks: TaskDTO[];
  loading: boolean;
  error: string | null;
  activeFilter: TaskType; // Add activeFilter to track the selected filter
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  activeFilter: TaskType.None, // Default to 'None' or any other initial value
};

type receivedTaskDTO = {
  id: string;
  time: number | null;
  metric: number | null;
  completionType: CompletionType;
  label: string;
  steps: string;
  taskType: string;
};

export const fetchAvailableTasks = createAsyncThunk(
  "tasks/fetchAvailableTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeApiCall.get(`tasks/available`);
      return response as receivedTaskDTO[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch tasks"
      );
    }
  }
);

// Action to set the selected task filter
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setActiveFilter: (state, action: PayloadAction<TaskType>) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAvailableTasks.fulfilled,
        (state, action: PayloadAction<receivedTaskDTO[]>) => {
          const taskWithParsedSteps = action.payload.map((returnedTask) => {
            return {
              ...returnedTask,
              steps: JSON.parse(returnedTask.steps),
            };
          });

          state.tasks = taskWithParsedSteps;
          state.loading = false;
        }
      );
  },
});

export const { setActiveFilter } = taskSlice.actions;

export const taskReducer = taskSlice.reducer;
