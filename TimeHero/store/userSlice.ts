import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoDTO } from "@/constants/UserInfoDTO";
import { makeApiCall } from "@/apiClient";

// Define the initial state of the slice
interface UserState {
  userInfo: UserInfoDTO | null;
  completedTasks: string[];
  earnedTime: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  userId: string;
  joinStatus: string;
}

const initialState: UserState = {
  userInfo: null,
  completedTasks: [],
  earnedTime: null,
  status: "idle",
  error: null,
  userId: "",
  joinStatus: "",
};

// Async thunk to fetch user information
export const fetchUserInfo = createAsyncThunk<UserInfoDTO, string>(
  "users/fetchUserInfo",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await makeApiCall.get(`users/${userId}/info`);
      const rawUserInfo = response;

      // Convert raw response to UserInfoDTO format
      const userInfo: UserInfoDTO = {
        id: rawUserInfo.id,
        completedTaskIDs: JSON.parse(rawUserInfo.completedTaskIDs || "[]"),
        accumulatedTime: rawUserInfo.accumulatedTime,
        depositedTime: rawUserInfo.depositedTime,
        leaderboardID: rawUserInfo.leaderboardID,
        activeTaskIDs: JSON.parse(rawUserInfo.activeTaskIDs || "[]"),
      };

      return userInfo;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk to fetch completed tasks
export const fetchCompletedTasks = createAsyncThunk<string[], string>(
  "users/fetchCompletedTasks",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await makeApiCall.get(`user/${userId}/completed`);
      return response.completedTasks;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk to fetch earned screen time
export const fetchEarnedTime = createAsyncThunk<number, string>(
  "users/fetchEarnedTime",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await makeApiCall.get(`/api/user/${userId}/earned-time`);
      return response.earnedTime;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk to update earned screen time
export const updateEarnedTime = createAsyncThunk<
  void,
  { userId: string; newTime: number }
>(
  "users/updateEarnedTime",
  async ({ userId, newTime }, { rejectWithValue }) => {
    try {
      await makeApiCall.put(`user/${userId}/earned-time`, { newTime });
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk to update completed tasks
export const updateCompletedTasks = createAsyncThunk<
  void,
  { userId: string; taskIds: string[] }
>(
  "users/updateCompletedTasks",
  async ({ userId, taskIds }, { rejectWithValue }) => {
    try {
      await makeApiCall.put(`/api/user/${userId}/completed`, { taskIds });
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk to join a leaderboard
export const joinLeaderboard = createAsyncThunk<
  string,
  { userId: string; leaderboardId: string }
>(
  "users/joinLeaderboard",
  async ({ userId, leaderboardId }, { rejectWithValue }) => {
    try {
      const response = await makeApiCall.put(
        `/api/user/${userId}/join-leaderboard`,
        {
          leaderboardId,
        }
      );
      return response.message;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: () => initialState,
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    resetJoinStatus: (state) => {
      state.joinStatus = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUserInfo lifecycle
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserInfo.fulfilled,
        (state, action: PayloadAction<UserInfoDTO>) => {
          state.status = "succeeded";
          state.userInfo = action.payload;
        }
      )
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Handle fetchCompletedTasks lifecycle
      .addCase(fetchCompletedTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCompletedTasks.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.status = "succeeded";
          state.completedTasks = action.payload;
        }
      )
      .addCase(fetchCompletedTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Handle fetchEarnedTime lifecycle
      .addCase(fetchEarnedTime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchEarnedTime.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          state.earnedTime = action.payload;
        }
      )
      .addCase(fetchEarnedTime.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Handle updateEarnedTime lifecycle
      .addCase(updateEarnedTime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEarnedTime.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateEarnedTime.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Handle updateCompletedTasks lifecycle
      .addCase(updateCompletedTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCompletedTasks.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateCompletedTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Handle joinLeaderboard lifecycle
      .addCase(joinLeaderboard.pending, (state) => {
        state.status = "loading";
        state.joinStatus = "";
      })
      .addCase(
        joinLeaderboard.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.joinStatus = action.payload;
        }
      )
      .addCase(joinLeaderboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetUserState, setUserId, resetJoinStatus } = userSlice.actions;

export default userSlice.reducer;
