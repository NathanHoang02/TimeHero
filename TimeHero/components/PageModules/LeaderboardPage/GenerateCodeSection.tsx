// components/GenerateCodeSection.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type GenerateCodeSectionProps = {
  onGeneratePress: () => void;
};

export const GenerateCodeSection: React.FC<GenerateCodeSectionProps> = ({ onGeneratePress }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Generate Join Code:</Text>
    <TouchableOpacity style={styles.generateButton} onPress={onGeneratePress}>
      <Text style={styles.generateButtonText}>Generate</Text>
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
  generateButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
