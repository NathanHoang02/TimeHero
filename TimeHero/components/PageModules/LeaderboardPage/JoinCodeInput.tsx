// components/JoinCodeInput.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

type JoinCodeInputProps = {
  joinCode: string;
  onJoinCodeChange: (code: string) => void;
  onJoinPress: () => void;
};

export const JoinCodeInput: React.FC<JoinCodeInputProps> = ({ joinCode, onJoinCodeChange, onJoinPress }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Enter Join Code:</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter Join Code"
      value={joinCode}
      onChangeText={onJoinCodeChange}
    />
    <TouchableOpacity style={styles.joinButton} onPress={onJoinPress}>
      <Text style={styles.joinButtonText}>Join</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  section: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
