import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HandleRedeemButton({ totalTime, setTotalTime }: { totalTime: number; setTotalTime: (time: number) => void }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [redeemTime, setRedeemTime] = useState('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleRedeemConfirm = () => {
    const redeemMinutes = parseInt(redeemTime) || 0;
    const redeemSeconds = redeemMinutes * 60;

    if (redeemSeconds > 0 && redeemSeconds <= totalTime) {
      setTotalTime(totalTime - redeemSeconds);
      closeModal();
    } else {
      alert('Invalid amount. Please enter a valid time to redeem.');
    }
    setRedeemTime('');
  };

  const handleRedeemAll = () => {
    setTotalTime(0);
    closeModal();
  };

  return (
    <>
      <TouchableOpacity onPress={openModal} style={styles.redeemButton}>
        <Text style={styles.redeemButtonText}>Redeem</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="fade" onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Exchange</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter time in minutes"
              keyboardType="numeric"
              value={redeemTime}
              onChangeText={setRedeemTime}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={handleRedeemConfirm} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRedeemAll} style={styles.modalCancelButton}>
                <Text style={styles.modalButtonText}>Redeem All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  redeemButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  redeemButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#FF474C',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
