import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Button, Modal, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import React, { useState } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import Leaderboard from '@/components/leaderboard';
import { JoinCodeInput } from '@/components/JoinCodeInput';
import { GenerateCodeSection } from '@/components/GenerateCodeSection';

const { width } = Dimensions.get('window');
const scale = width / 375; 
const scaledSize = (size) => size * scale;

export default function LeaderboardScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  const handleJoinLeaderboard = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleJoin = () => {
    console.log("Join Code Entered:", joinCode);
    setModalVisible(false); 
  };

  const handleGenerateCode = () => {
    const newCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    console.log("Generated Code:", newCode);
    alert(`Generated Code: ${newCode}`); // Or handle display as needed
  };

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
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<Ionicons size={scaledSize(310)} name="trophy" style={styles.headerImage} />}>
      <Text style={styles.title}>Leaderboard</Text>
      <Leaderboard players={players}/>
      <View style={styles.buttonContainer}>
        <Button title="Join Leaderboard" onPress={handleJoinLeaderboard} />
      </View>

      {/* Modal for "Join Leaderboard" */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* "X" Close Button */}
            <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
              <Ionicons name="close" size={scaledSize(24)} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Join the Leaderboard</Text>

            {/* Row container for "Enter Join Code" and "Generate Join Code" sections */}
            <View style={styles.rowContainer}>
              <JoinCodeInput joinCode={joinCode} onJoinCodeChange={setJoinCode} onJoinPress={handleJoin} />
              <View style={styles.verticalDivider} />
              <GenerateCodeSection onGeneratePress={handleGenerateCode} />
            </View>
          </View>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: scaledSize(40),
    fontWeight: 'bold',
    color:'#c70a29',
    textAlign: 'center',
    marginBottom: scaledSize(16),
  },
  headerImage: {
    color: '#FFFF00',
    bottom: -scaledSize(90),
    left: -scaledSize(35),
    position: 'absolute',
  },
  buttonContainer: {
    padding: scaledSize(16),
    marginTop: scaledSize(20),
    alignSelf: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: scaledSize(20),
    borderRadius: 10,
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: scaledSize(10),
    right: scaledSize(10),
  },
  modalTitle: {
    fontSize: scaledSize(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: scaledSize(20),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
    marginHorizontal: scaledSize(10),
  },
});
