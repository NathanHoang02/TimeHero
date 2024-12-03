// src/screens/TasksScreen.tsx
import { useAppDispatch, RootState } from "@/store/store";
import { fetchAvailableTasks } from "@/store/taskSlice";
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

const TasksScreen = () => {
  const $tasks = useSelector((state: RootState) => state.tasks.tasks); // Select the tasks from Redux
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAvailableTasks()); // Dispatch action to fetch tasks from the API
  }, []);

  return (
    <View style={styles.container} id="checkforidhere">
      <FlatList
        data={$tasks} // Use the tasks fetched from Redux
        keyExtractor={(item) => item.id.toString()} // Ensure `id` is a string for FlatList keyExtractor
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.label}>{item.label}</Text>
            <Text>Type: {item.taskType}</Text>
            <Text>Metric: {item.metric ?? "N/A"}</Text>
            <Text>Time: {item.time ? `${item.time} seconds` : "N/A"}</Text>
            {item.steps && item.steps.length > 0 && (
              <View>
                <Text style={styles.stepsLabel}>Steps:</Text>
                {item.steps.map((step, index) => (
                  <Text key={index}>
                    {index + 1}. {step}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
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
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
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
