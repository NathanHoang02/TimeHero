import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressBarProps {
  completion: number; 
  size: number;
  hideCenterLabel?: boolean;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ completion = 0, size = 120, hideCenterLabel = false }) => {
  const strokeWidth = 5; // Thickness of the circle
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const progress = (completion / 100) * circumference; // Length of the filled part

  return (
    <View style={styles.container}>
      <Svg height={size} width={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#8a2be2" // Purple color
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {/* Percentage Text */}
      {!hideCenterLabel && <Text style={styles.text}>{`${Math.round(completion)}%`}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default CircularProgressBar;
