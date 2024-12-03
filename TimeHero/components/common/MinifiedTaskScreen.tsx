import React, { useMemo } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import TaskModal from "@/components/common/TaskModal";

const MinifiedTasksScreen = () => {
  const $tasks = useSelector((state: RootState) => state.tasks.tasks);
  const $userCompletedTasks = useSelector(
    (state: RootState) => state.user.completedTasks
  );

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<any>(null);

  // Helper function to convert seconds into hours, minutes, seconds
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? hours + "h" : ""} ${
      minutes > 0 ? minutes + "m" : ""
    } ${remainingSeconds > 0 ? remainingSeconds + "s" : ""}`;
  };

  const minifiedTaskList = useMemo(() => {
    return $tasks
      .filter((task) => !$userCompletedTasks.includes(task.id)) // Exclude completed tasks
      .sort((a, b) => (a.time || Infinity) - (b.time || Infinity)) // Sort by least time
      .slice(0, 5); // Select top 5 tasks
  }, [$tasks, $userCompletedTasks]);

  const openModal = (task: any) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  return (
    <View style={styles.container}>
      {isModalVisible && selectedTask && (
        <TaskModal
          task={selectedTask}
          isVisible={isModalVisible}
          onClose={closeModal}
        />
      )}
      <Text style={styles.title}>Quick Tasks</Text>
      <FlatList
        data={minifiedTaskList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskLabel}>{item.label}</Text>
            <Text style={styles.taskTime}>
              Rewarded Screen Time: {item.time ? formatTime(item.time) : "N/A"}
            </Text>
            <Button
              title="Start Task"
              onPress={() => openModal(item)}
              color="#835352"
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No quick tasks available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    marginTop: 20,
  },
  taskItem: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  taskLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "#333",
  },
  taskTime: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default MinifiedTasksScreen;
