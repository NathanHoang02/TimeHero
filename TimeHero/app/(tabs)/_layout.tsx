import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { TutorialProvider, useTutorial } from '@/components/LoginTutorial';
import Slideshow from '@/components/LoginTutorial';

export default function TabLayout() {
  const colorScheme = useColorScheme() as 'light' | 'dark';

  return (
    <TutorialProvider>
      <LayoutContent colorScheme={colorScheme} />
    </TutorialProvider>
  );
}

const LayoutContent: React.FC<{ colorScheme: 'light' | 'dark' }> = ({ colorScheme }) => {
  const { tutorialStatus, endTutorial } = useTutorial();

  if (tutorialStatus) {
    return <Slideshow endTutorial={endTutorial} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'clipboard' : 'clipboard-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="time"
        options={{
          title: 'Time',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'hourglass' : 'hourglass-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'stats-chart' : 'stats-chart-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};