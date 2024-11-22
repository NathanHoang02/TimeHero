import React, { useState, useEffect  } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import HandleRedeemButton from '@/components/handleRedeemButton';
import Ionicons from '@expo/vector-icons/Ionicons';

import { RootState, useAppDispatch } from '@/store/store';
import { fetchUserInfo } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useStoreRootState } from 'expo-router/build/global-state/router-store';

export default function TimeScreen() {
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const dispatch = useAppDispatch();

  // Retrieve UserID from Redux
  const userId = useSelector((state: RootState) => state.user.userId);

  // Get accumulateTime from userinfo
  const $userAccumulatedTime = useSelector((state: RootState) => state.user.userInfo?.accumulatedTime) ?? null;

  useEffect(() => {
    if (userId) {
        dispatch(fetchUserInfo(userId));
    }
  }, [dispatch, userId]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Ionicons size={310} name="time" style={styles.headerImage} />}
    >
      <Text style={styles.title}>Time Earned</Text>

      <View style={styles.timerBackground}>
        <Text style={styles.timerText}>{formatTime($userAccumulatedTime ?? 0)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <HandleRedeemButton totalTime={$userAccumulatedTime ?? 0}/>
      </View>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#808080',
  },
  timerBackground: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
});
