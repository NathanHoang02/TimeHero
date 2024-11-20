import React from "react";

import { Dimensions, Image, StyleSheet } from "react-native";

interface QuickDashboardProps {
  completionPercentage: number;
  totalTime: number; //in seconds
  timeEarned: number; //in seconds
}

const QuickDashboard = ({
  completionPercentage,
  totalTime,
  timeEarned,
}: QuickDashboardProps) => {
  const formatSecondsToTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const hoursPart = hours > 0 ? `${hours} hr` : "";
    const minutesPart = minutes > 0 ? `${minutes} min` : "";

    return `${hoursPart} ${minutesPart}`.trim();
  };

  return (
    <div style={styles.dashboardContainer}>
      <div>
        <p style={styles.regularText}>
            Time Earned:
        </p>
        <p>
            {formatSecondsToTime(timeEarned)}
        </p>
      </div>
      <div>
      <p style={styles.regularText}>
            Percentage of Completion:
        </p>
        <p>
            {formatSecondsToTime(timeEarned)}
        </p>
      </div>
    </div>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  regularText: {},
  boldText: {
    fontSize: 30,
    fontFamily: "sans-serif",
    color: "black",
    paddingLeft: "3%",
    fontWeight: "bold",
  },
});

export default QuickDashboard;
