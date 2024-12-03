import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { CompletionType } from "@/constants/CompletionType";
import { TaskDTO } from "@/constants/TaskDTO";
import {
  fetchUserInfo,
  updateCompletedTasks,
  updateEarnedTime,
} from "@/store/userSlice";
import { RootState, useAppDispatch } from "@/store/store";

interface TaskModalProps {
  task: TaskDTO;
  isVisible: boolean;
  onClose: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const TaskModal: React.FC<TaskModalProps> = ({ task, isVisible, onClose }) => {
  const dispatch = useAppDispatch();
  const $userId = useSelector((state: RootState) => state.user.userInfo?.id);
  const $earnedTime = useSelector(
    (state: RootState) => state.user.userInfo?.accumulatedTime
  );
  const $userCompletedTasks = useSelector(
    (state: RootState) => state.user.userInfo?.completedTaskIDs
  );

  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    task.time ?? null
  );
  const [counter, setCounter] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [startButtonDisabled, setStartButtonDisabled] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      isTimerRunning &&
      timeRemaining !== null &&
      timeRemaining > 0 &&
      !isPaused
    ) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime && prevTime > 0) return prevTime - 1;
          clearInterval(timer);
          setIsTimerRunning(false);
          return 0;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTimerRunning, timeRemaining, isPaused]);

  const handleStartTimer = () => {
    setIsTimerRunning(true);
    setStartButtonDisabled(true);
  };

  const handlePauseTimer = () => {
    setIsPaused(true);
  };

  const handleResumeTimer = () => {
    setIsPaused(false);
  };

  const handleCompleteTask = () => {
    if (!task.id) return; // Ensure the task has an ID to track it

    // Update completed tasks
    const updatedCompletedTasks = [...$userCompletedTasks ?? [], task.id];

    // Update earned time
    const additionalTime = task.time ?? 0;
    const updatedEarnedTime = ($earnedTime ?? 0) + additionalTime;

    // Dispatch updates
    if ($userId) {
      dispatch(
        updateCompletedTasks({
          userId: $userId,
          taskIds: updatedCompletedTasks,
        })
      ).then(() => {
          dispatch(
            updateEarnedTime({ userId: $userId, newTime: updatedEarnedTime })
          );
      }).then(() => {
          // Refetch user data to ensure state consistency
          dispatch(fetchUserInfo($userId));
      })
    }

    // Mark task as completed locally
    setCompleted(true);
    onClose();
  };

  const handleCounterChange = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setCounter(parsedValue);
    }
  };

  // Format timeRemaining into minutes and seconds
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalWrapper}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.header}>Active Task:</Text>
          <Text style={styles.taskLabel}>{task.label}</Text>

          <View style={styles.steps}>
            <Text style={styles.stepsLabel}>Steps:</Text>
            {task.steps.map((step, index) => (
              <Text key={index} style={styles.stepText}>
                {index + 1}. {step}
              </Text>
            ))}
          </View>

          {task.completionType === CompletionType.TIMER &&
            timeRemaining !== null && (
              <View style={styles.timer}>
                <Text style={styles.timerText}>
                  Time Remaining: {formatTime(timeRemaining)}
                </Text>
                {!isTimerRunning ? (
                  <Button
                    title="Start Timer"
                    onPress={handleStartTimer}
                    disabled={startButtonDisabled}
                  />
                ) : isPaused ? (
                  <Button title="Resume Timer" onPress={handleResumeTimer} />
                ) : (
                  <Button title="Pause Timer" onPress={handlePauseTimer} />
                )}
              </View>
            )}

          {task.completionType === CompletionType.COUNTER && (
            <View style={styles.counter}>
              <Text style={styles.counterLabel}>Counter:</Text>
              <TextInput
                style={styles.input}
                value={String(counter)}
                onChangeText={handleCounterChange}
                keyboardType="numeric"
              />
              <Button title="Complete" onPress={handleCompleteTask} />
            </View>
          )}

          {task.completionType === CompletionType.SELF_VERIFIED && (
            <View style={styles.selfVerified}>
              <Button
                title="Self Verify and Complete"
                onPress={handleCompleteTask}
              />
            </View>
          )}

          {completed && (
            <Text style={styles.completedText}>Task Completed!</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  container: {
    justifyContent: "space-evenly",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: screenWidth * 0.8,
    height: screenHeight * 0.5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  taskLabel: {
    fontSize: 22,
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
  },
  steps: {
    marginTop: 20,
    marginBottom: 20,
  },
  stepsLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  stepText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  timer: {
    marginTop: 20,
  },
  timerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
  },
  counter: {
    marginTop: 20,
  },
  counterLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 100,
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  selfVerified: {
    marginTop: 20,
  },
  completedText: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default TaskModal;
