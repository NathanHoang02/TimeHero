import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { useDispatch } from 'react-redux';
import { taskReducer } from './taskSlice';
import leaderboardReducer from './leaderboardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
    leaderboard: leaderboardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const dispatch = useDispatch();
