import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { useDispatch } from 'react-redux';
import { taskReducer } from './taskSlice';
import leaderboardReducer from './leaderboardSlice';

// Configure the store with reducers
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

// Custom hook for useDispatch with the correct type
export const useAppDispatch: () => AppDispatch = useDispatch;

