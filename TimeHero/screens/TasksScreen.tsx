// src/screens/TasksScreen.tsx
import { useAppDispatch, RootState } from '@/store/store';
import { fetchAvailableTasks } from '@/store/taskSlice';
import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// Hardcoded list of tasks for testing
const hardcodedTasks = [
  {
    id: '1',
    time: 300, // 5 minutes
    metric: 10,
    completionType: 'timer',
    label: 'Read a Book',
    steps: ['Find a book', 'Read for 10 minutes', 'Summarize what you read'],
    taskType: 'Reading',
  },
  {
    id: '2',
    time: 600, // 10 minutes
    metric: 20,
    completionType: 'timer',
    label: 'Exercise',
    steps: ['Warm-up', 'Do push-ups', 'Cool down'],
    taskType: 'Workout',
  },
  {
    id: '3',
    time: null,
    metric: null,
    completionType: 'manual',
    label: 'Meditation',
    steps: ['Find a quiet place', 'Set a timer for 10 minutes', 'Focus on your breathing'],
    taskType: 'Mindfulness',
  },
];

const TasksScreen = () => {
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const dispatch = useAppDispatch();

  // useEffect for fetching tasks from API - commented out for now
  useEffect(() => {
    // Uncomment this line to use the fetchAvailableTasks async thunk
    dispatch(fetchAvailableTasks());
  }, [dispatch]);

  // Display loading indicator if API call is in progress
  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  // Display error message if API call fails
  // if (error) {
  //   return <Text style={styles.error}>{error}</Text>;
  // }

  // Use hardcoded tasks for now. Replace `hardcodedTasks` with `tasks` after testing the API.
  const taskList = hardcodedTasks; // Change to `tasks` after verifying the API connection

  return (
    <View style={styles.container}>
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.label}>{item.label}</Text>
            <Text>Type: {item.taskType}</Text>
            <Text>Metric: {item.metric ?? 'N/A'}</Text>
            <Text>Time: {item.time ? `${item.time} seconds` : 'N/A'}</Text>
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
    backgroundColor: '#fff',
  },
  taskItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TasksScreen;
