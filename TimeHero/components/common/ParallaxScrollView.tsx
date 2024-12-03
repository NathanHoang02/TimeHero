import React, { useState, type PropsWithChildren, type ReactElement } from "react";
import { Easing, StyleSheet, useColorScheme, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withSpring,
} from "react-native-reanimated";

import { ThemedView } from "@/components/common/ThemedView";
import { useAppDispatch } from "@/store/store";
import { TaskType } from "@/constants/TaskType";
import { setActiveFilter } from "@/store/taskSlice";
import { FAB, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  taskVariant?: boolean;
}>;

const ICONS = {
  [TaskType.PhysicalFitness]: "fitness",
  [TaskType.MentalHealth]: "medical",
  [TaskType.Education]: "school",
  [TaskType.Household]: "home",
  [TaskType.Creativity]: "color-palette",
  [TaskType.Social]: "people",
  [TaskType.Outdoor]: "leaf",
  [TaskType.None]: "close",
};

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  taskVariant,
}: Props) {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const [showFilterButtons, setShowFilterButtons] = useState(false);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
        ),
      },
      {
        scale: interpolate(
          scrollOffset.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [2, 1, 1]
        ),
      },
    ],
  }));

  const filterButtonStyle = useAnimatedStyle(() => ({
    opacity: withSpring(showFilterButtons ? 1 : 0, {
      damping: 30,
      stiffness: 200,
      mass: 1,
    }),
    transform: [
      {
        translateY: withSpring(showFilterButtons ? 0 : 60, {
          damping: 30,
          stiffness: 200,
          mass: 1,
        }),
      },
    ],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: withSpring(showFilterButtons ? 0.5 : 0, {
      damping: 30,
      stiffness: 200,
    }),
  }));

  const handleFilterChange = (newFilter: TaskType) => {
    dispatch(setActiveFilter(newFilter));
    setShowFilterButtons(false);
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            taskVariant ? styles.autoHeader : styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <ThemedView style={taskVariant ? styles.taskContent : styles.content}>
          {children}
        </ThemedView>
      </Animated.ScrollView>

      {/* Backdrop */}
      {taskVariant && (
        <Animated.View
          style={[
            styles.backdrop,
            backdropStyle,
            { display: showFilterButtons ? "flex" : "none" }, // Hide when inactive
          ]}
        />
      )}

      {/* Floating Action Button */}
      {taskVariant && (
        <FAB
          style={styles.fab}
          icon="filter"
          onPress={() => setShowFilterButtons(!showFilterButtons)}
          color="white"
          small
        />
      )}

      {/* Filter Buttons */}
      {taskVariant && showFilterButtons && (
        <Animated.View
          style={[styles.filterButtonsContainer, filterButtonStyle]}
        >
          {Object.keys(TaskType).map((key) => {
            const taskType = TaskType[key as keyof typeof TaskType];
            return (
              <View key={taskType} style={styles.filterButton}>
                <FAB
                  style={styles.filterButtonFAB}
                  icon={ICONS[taskType]}
                  onPress={() => handleFilterChange(taskType)}
                  color="white"
                  label={taskType}
                  small
                />
              </View>
            );
          })}
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: "hidden",
  },
  autoHeader: {
    height: "auto",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
  taskContent: {
    flex: 1,
    padding: 8,
    gap: 16,
    overflow: "hidden",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: Colors["light"].tint,
    zIndex: 3,
  },
  filterButtonsContainer: {
    position: "absolute",
    bottom: 80,
    right: 16,
    alignItems: "flex-end",
    gap: 10,
    zIndex: 3,
  },
  filterButton: {
    alignItems: "center",
    zIndex: 3,
  },
  filterButtonFAB: {
    marginBottom: 5,
    backgroundColor: Colors["light"].tint,
    zIndex: 3,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    zIndex: 1, // Ensure it appears above content but below FABs
  },
});
