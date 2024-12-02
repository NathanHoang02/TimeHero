// src/features/leaderboard/leaderboardSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

// Define the types
interface UserOnLeaderboard {
  id: string;
  username: string;
  accumulatedTime: number;
}

interface LeaderboardState {
  users: UserOnLeaderboard[];
  loading: boolean;
  error: string | null;
  joinStatus: string;
}

const initialState: LeaderboardState = {
  users: [],
  loading: false,
  error: null,
  joinStatus: '',
};

// Async Thunk for fetching leaderboard data
export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetchLeaderboard',
  async (leaderboardId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<UserOnLeaderboard[]>(`http://localhost:5000/api/leaderboard/${leaderboardId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch leaderboard');
    }
  }
);

// Async Thunk for joining a leaderboard
export const joinLeaderboard = createAsyncThunk(
  'leaderboard/joinLeaderboard',
  async ({ userId, leaderboardId }: { userId: string; leaderboardId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/leaderboard/${userId}/join`, {
        leaderboardId,
      });
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to join leaderboard');
    }
  }
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    resetJoinStatus: (state) => {
      state.joinStatus = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Leaderboard Data
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action: PayloadAction<UserOnLeaderboard[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Join Leaderboard
      .addCase(joinLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.joinStatus = '';
      })
      .addCase(joinLeaderboard.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.joinStatus = action.payload;
      })
      .addCase(joinLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetJoinStatus } = leaderboardSlice.actions;

// export const selectLeaderboard = (state: RootState) => state.leaderboard;

export default leaderboardSlice.reducer;
