import { useState, type PropsWithChildren, type ReactElement } from "react";
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

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  taskVariant?: boolean;
}>;

const ICONS = {
  [TaskType.PhysicalFitness]: "fitness",
  [TaskType.MentalHealth]: "medkit",
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

  // State for showing/hiding filter buttons
  const [showFilterButtons, setShowFilterButtons] = useState(false);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
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
    };
  });

  // Function to handle filter change
  const handleFilterChange = (newFilter: TaskType) => {
    dispatch(setActiveFilter(newFilter)); // Dispatch the filter action directly from taskSlice
    setShowFilterButtons(false); // Close filter buttons after selection
  };

  // Animation style for filter buttons
  const filterButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(showFilterButtons ? 1 : 0, {
        damping: 30,
        stiffness: 200,
        mass: 1,
        // easing: Easing.ease,
      }),
      transform: [
        {
          translateY: withSpring(showFilterButtons ? 0 : 60, {
            damping: 30,
            stiffness: 200,
            mass: 1,
            // easing: Easing.ease,
          }),
        },
      ],
    };
  });

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

      {/* Floating Action Button for setting filter */}
      {taskVariant && (
        <FAB
          style={styles.fab}
          icon="filter"
          onPress={() => setShowFilterButtons(!showFilterButtons)} // Toggle the filter buttons
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
    position: "absolute", // Fixed positioning relative to the container
    bottom: 16,
    right: 16,
    backgroundColor: "blue", // Customize the color of the FAB
  },
  filterButtonsContainer: {
    position: "absolute",
    bottom: 80, // Just above the FAB
    right: 16,
    alignItems: 'flex-end',
    gap: 10,
  },
  filterButton: {
    alignItems: "center",
  },
  filterButtonFAB: {
    marginBottom: 5,
    backgroundColor: "blue", // Customize the color of the filter button
  },
  buttonLabel: {
    alignItems: "center",
  },
  filterButtonLabel: {
    fontSize: 12,
    color: "black",
  },
});
