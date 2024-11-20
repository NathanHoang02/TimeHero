import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/common/HelloWave";
import ParallaxScrollView from "@/components/common/ParallaxScrollView";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import HomeScreenContent from "@/screens/HomeScreenContent";

export default function HomeScreen() {
  return <HomeScreenContent />;
}
