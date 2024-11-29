import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TaskScreen from '@/screens/TasksScreen';

const Tab = createBottomTabNavigator();
export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Tasks') iconName = 'list';
              else if (route.name === 'Completed') iconName = 'checkmark-done';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#007BFF',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Tasks" component={TaskScreen} />
          <Tab.Screen name="Completed" component={CompletedScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }