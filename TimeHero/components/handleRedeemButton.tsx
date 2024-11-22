import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HandleRedeemButton({ totalTime }: { totalTime: number }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalTwoVisible, setModalTwoVisible] = useState(false);
  const [pendingModal2, setPendingModal2] = useState(false);
  const [redeemTime, setRedeemTime] = useState('');
  const [countdownTime, setCountdownTime] = useState(0);
  const [currentTotalTime, setCurrentTotalTime] = useState(totalTime);

  useEffect(() => {
    setCurrentTotalTime(totalTime);
  }, [totalTime]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setPendingModal2(true);
  };

  const openModal2 = () => {
    setModalTwoVisible(true);
    setPendingModal2(false);
  };

  const closeModal2 = () => setModalTwoVisible(false);

  const handleRedeemConfirm = () => {
    const redeemMinutes = parseInt(redeemTime) || 0;
    const redeemSeconds = redeemMinutes * 60;

    if (redeemSeconds > 0 && redeemSeconds <= currentTotalTime) {
      setCurrentTotalTime(currentTotalTime - redeemSeconds);
      setCountdownTime(redeemSeconds); // Set the countdown time
      closeModal();
    } else {
      alert('Invalid amount. Please enter a valid time to redeem.');
    }
    setRedeemTime('');
  };

  const handleRedeemAll = () => {
    setCountdownTime(currentTotalTime); // Set countdown to all available time
    setCurrentTotalTime(0);
    closeModal();
  };

  // Countdown logic for Modal 2
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (countdownTime > 0) {
      timer = setInterval(() => {
        setCountdownTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (countdownTime === 0 && isModalTwoVisible) {
      clearInterval(timer);
      setModalTwoVisible(false); // Close the modal when the timer ends
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdownTime, isModalTwoVisible]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <>
      <TouchableOpacity onPress={openModal} style={styles.redeemButton}>
        <Text style={styles.redeemButtonText}>Redeem</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onDismiss={() => {
          if (pendingModal2) openModal2(); // open modal 2 after modal 1 is dismissed
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
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

      <Modal visible={isModalTwoVisible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalTwoContainer}>
            <Text style={styles.modalTwoTitle}>Countdown Timer</Text>
            <Text style={styles.timerText}>{formatTime(countdownTime)}</Text>
            <TouchableOpacity style={styles.closeIcon} onPress={closeModal2}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTwoContainer: {
    width: '80%',
    backgroundColor: '#000000',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTwoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#808080',
    marginBottom: 20,
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
