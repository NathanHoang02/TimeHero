import React, { useState, useEffect  } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ParallaxScrollView from '@/components/common/ParallaxScrollView';
import HandleRedeemButton from '@/components/PageModules/TimePage/handleRedeemButton';
import Ionicons from '@expo/vector-icons/Ionicons';

import { RootState, useAppDispatch } from '@/store/store';
import { fetchEarnedTime, fetchUserInfo, updateEarnedTime } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useStoreRootState } from 'expo-router/build/global-state/router-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TimeScreen() {
  // const formatTime = (timeInSeconds: number) => {
  //   const hours = Math.floor(timeInSeconds / 3600);
  //   const minutes = Math.floor((timeInSeconds % 3600) / 60);
  //   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  // };

  const dispatch = useAppDispatch();

  const $userId = useSelector((state: RootState) => state.user.userId);
  const $earnedTime = useSelector((state: RootState) => state.user.userInfo?.accumulatedTime) ?? 0;

  useEffect(() => {
    if ($userId) {
        dispatch(fetchUserInfo($userId));
    }
  }, [dispatch, $userId]);

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

  const handleTimeUpdate = async (newTime: number) => {
    if ($userId){
      await dispatch(updateEarnedTime({userId: $userId, newTime}));
      dispatch(fetchEarnedTime($userId));
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}hr :${String(minutes).padStart(2, '0')}mins`;
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#8766E5", dark: "#8766E5" }}
      headerImage={
        <Ionicons size={310} name="time" style={styles.headerImage} />
      }
    >
      <Text style={styles.title}>Time Earned</Text>

      <View style={styles.timerBackground}>
        <Text style={styles.timerText}>{formatTime($earnedTime ?? 0)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <HandleRedeemButton totalTime={$earnedTime} onTimeUpdate={handleTimeUpdate}/>
      </View>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color:'#8766E5',
    textAlign: 'center',
    marginBottom: 16,
  },
  headerImage: {
    color: "#fff",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "black",
  },
  timerBackground: {
    backgroundColor: "#E0E0F2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
});
