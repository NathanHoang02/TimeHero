import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Leaderboard from '@/components/leaderboard';

export default function LeaderboardScreen() {
  type Player = {
    id: number;
    name: string;
    score: number;
  };
  
  const players: Player[] = [
    { id: 1, name: 'Alice', score: 120 },
    { id: 2, name: 'Bob', score: 95 },
    { id: 3, name: 'Charlie', score: 110 },
    { id: 4, name: 'David', score: 85 },
    { id: 5, name: 'Eve', score: 130 },
    { id: 6, name: 'Frank', score: 90 },
    { id: 7, name: 'Grace', score: 105 },
    { id: 8, name: 'Hank', score: 75 },
    { id: 9, name: 'Ivy', score: 115 },
    { id: 10, name: 'Jack', score: 100 },
  ];
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="trophy" style={styles.headerImage} />}>
      <Leaderboard players={players}/>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
