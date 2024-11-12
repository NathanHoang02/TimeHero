import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Player = {
  id: number;
  name: string;
  score: number;
};

type LeaderboardProps = {
  players: Player[];
};

const Leaderboard = ({ players }: LeaderboardProps) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Ionicons name="medal" size={30} color="gold" />;
    if (rank === 2) return <Ionicons name="medal" size={30} color="silver" />;
    if (rank === 3) return <Ionicons name="medal" size={30} color="brown" />;
    return null;
  };

  return (
    <View style={styles.leaderboardContainer}>
       <View style={styles.headerRow}>
        <Text style={[styles.headerText, styles.rankHeader]}>Rank</Text>
        <Text style={[styles.headerText, styles.nameHeader]}>Player Name</Text>
        <Text style={[styles.headerText, styles.scoreHeader]}>Score</Text>
      </View>
      {sortedPlayers.map((player, index) => {
        const rank = index + 1;
        return (
          <View key={player.id} style={styles.playerRow}>
            <View style={styles.rankContainer}>
              {getMedalIcon(rank)}
               {rank > 3 && <Text style={styles.rank}>{rank}</Text>}
            </View>
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.playerScore}>{player.score}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  leaderboardContainer: {
    padding: 20,
  },

  headerRow: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Distribute space evenly between columns
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#fff', // Light border to separate header from the content
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White color for header text
    textAlign: 'center', // Center the text within its column
    flex: 1, // Ensure columns expand evenly
  },
  rankHeader: {
    width: 60, // Optional: Adjust width for the "Rank" column
  },
  nameHeader: {
    flex: 3, // Optional: Make "Player Name" column wider
  },
  scoreHeader: {
    width: 80, // Optional: Adjust width for the "Score" column
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingBottom: 10,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#fff'
  },
  playerName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  },
  playerScore: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
  },
});

export default Leaderboard;
