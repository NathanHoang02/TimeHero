import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Define types for the leaderboard
type Player = {
  id: number;
  name: string;
  score: number;
};

type LeaderboardProps = {
  players: Player[];
};

const Leaderboard: React.FC<LeaderboardProps> = ({ players }) => {
  // Sort players by score in descending order
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Render each item
  const renderPlayer = ({ item, index }: { item: Player; index: number }) => (
    <View style={styles.row}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={sortedPlayers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlayer}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rank: {
    fontSize: 18,
    width: 30,
    textAlign: 'center',
  },
  name: {
    fontSize: 18,
    flex: 1,
  },
  score: {
    fontSize: 18,
    width: 60,
    textAlign: 'right',
  },
});

export default Leaderboard;
