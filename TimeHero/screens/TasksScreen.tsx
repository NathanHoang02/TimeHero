import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "@/store/store";
import TaskModal from "@/components/common/TaskModal";
import { TaskType } from "@/constants/TaskType";
import { fetchCompletedTasks, fetchUserInfo } from "@/store/userSlice";
import { fetchAvailableTasks, setActiveFilter } from "@/store/taskSlice"; // Import the action to set active filter
import AsyncStorage from "@react-native-async-storage/async-storage";

const TasksScreen = () => {
  const $tasks = useSelector((state: RootState) => state.tasks.tasks);
  const $userId = useSelector((state: RootState) => state.user.userInfo?.id);
  const $userCompletedTasks = useSelector(
    (state: RootState) => state.user.completedTasks
  );
  const activeTypeFilter = useSelector(
    (state: RootState) => state.tasks.activeFilter
  );
  const dispatch = useAppDispatch();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchAvailableTasks());
    if ($userId) dispatch(fetchCompletedTasks($userId));
  }, [dispatch, $userId]);

  useEffect(() => {
    const getUserIdFromStorage = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          // If a userId is found, dispatch the fetchUserInfo action
          dispatch(fetchUserInfo(storedUserId));
        }
      } catch (error) {
        console.error('Failed to load userId from AsyncStorage:', error);
      }
    };

    getUserIdFromStorage();
  }, [dispatch]);

  const finalizedTaskList = useMemo(() => {
    const nonCompletedTasks = $tasks.filter(
      (task) => !$userCompletedTasks.includes(task.id)
    );

    const matchingActiveTypeFilter =
      activeTypeFilter && activeTypeFilter !== TaskType.None
        ? nonCompletedTasks.filter((task) => task.taskType === activeTypeFilter)
        : nonCompletedTasks;

    return matchingActiveTypeFilter;
  }, [$tasks, activeTypeFilter, $userCompletedTasks]);

  const openModal = (task: any) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  // Helper function to convert seconds into hours, minutes, seconds
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? hours + "h" : ""} ${
      minutes > 0 ? minutes + "m" : ""
    } ${remainingSeconds > 0 ? remainingSeconds + "s" : ""}`;
  };

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  return (
    <View style={styles.container}>
      {isModalVisible && selectedTask && (
        <TaskModal
          task={selectedTask}
          isVisible={isModalVisible}
          onClose={closeModal}
        />
      )}
      <Text style={styles.listLabel}>Task List: </Text>
      <FlatList
        data={shuffleArray(finalizedTaskList)} // Use the filtered tasks
        keyExtractor={(item) => item.id.toString()} // Ensure `id` is a string for FlatList keyExtractor
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.label}>{item.label}</Text>
            <Text>
              <Text style={styles.boldText}>Type:</Text> {item.taskType}
            </Text>

            <Text>
              <Text style={styles.boldText}>Screen Time Rewarded:</Text>{" "}
              {item.time ? formatTime(item.time) : "N/A"}
            </Text>

            <Button title="Select Task" color="#8766E5" onPress={() => openModal(item)} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.error}>No tasks available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  taskItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    gap: 10,
    backgroundColor: "#E0E0F2",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  listLabel: {
    fontWeight: "bold",
    fontSize: 24,
  },
  boldText: {
    fontWeight: "bold", // Makes "Type:" and "Screen Time Rewarded:" labels bold
  },
  stepsLabel: {
    fontWeight: "bold",
    marginTop: 8,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default TasksScreen;
