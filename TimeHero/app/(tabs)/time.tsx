import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import HandleRedeemButton from '@/components/handleRedeemButton';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TimeScreen() {
  const [totalTime, setTotalTime] = useState(20000);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Ionicons size={310} name="time" style={styles.headerImage} />}
    >
      <Text style={styles.title}>Time Earned</Text>

      <View style={styles.timerBackground}>
        <Text style={styles.timerText}>{formatTime(totalTime)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <HandleRedeemButton totalTime={totalTime} setTotalTime={setTotalTime} />
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
