import { Image, StyleSheet, Platform } from "react-native";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUserInfo } from '@/store/userSlice';
import { RootState, useAppDispatch } from '@/store/store';
import { ID_MAP } from '@/constants/ID_MAP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreenContent from "@/screens/HomeScreenContent";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const $userId = useSelector((state: RootState) => state.user.userInfo?.id);

  useEffect(() => {
    const getUserIdFromStorage = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          // If a userId is found, dispatch the fetchUserInfo action
          dispatch(fetchUserInfo(storedUserId));
        }
      } catch (error) {
        console.error('Failed to load userId from AsyncStorage:', error);
      }
    };

    getUserIdFromStorage();
  }, [dispatch]);

  return (
    <HomeScreenContent />
  );
}
