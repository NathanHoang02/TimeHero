import { UserInfoDTO } from '@/constants/UserInfoDTO';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state of the slice
interface UserState {
  userInfo: UserInfoDTO | null;
  completedTasks: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  userId: string;
}

const initialState: UserState = {
  userInfo: null,
  completedTasks: [],
  status: 'idle',
  error: null,
  userId: ""
};

// Async thunk to fetch user information
export const fetchUserInfo = createAsyncThunk<UserInfoDTO, string>(
  'user/fetchUserInfo',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/user/${userId}/info`);
      const rawUserInfo = response.data;

      // Convert raw response to UserInfoDTO format
      const userInfo: UserInfoDTO = {
        id: rawUserInfo.id,
        completedTaskIDs: JSON.parse(rawUserInfo.completedTaskIDs || '[]'),
        accumulatedTime: rawUserInfo.accumulatedTime,
        depositedTime: rawUserInfo.depositedTime,
        leaderboardID: rawUserInfo.leaderboardID,
        activeTaskIDs: JSON.parse(rawUserInfo.activeTaskIDs || '[]'),
      };

      return userInfo;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk to fetch completed tasks
export const fetchCompletedTasks = createAsyncThunk<string[], string>(
  'user/fetchCompletedTasks',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/user/${userId}/completed`);
      return response.data.completedTasks;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: () => initialState,
    setUserId: (state, val) => {
        state.userId = val.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUserInfo lifecycle
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<UserInfoDTO>) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Handle fetchCompletedTasks lifecycle
      .addCase(fetchCompletedTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompletedTasks.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.status = 'succeeded';
        state.completedTasks = action.payload;
      })
      .addCase(fetchCompletedTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { resetUserState, setUserId } = userSlice.actions;

export default userSlice.reducer;
