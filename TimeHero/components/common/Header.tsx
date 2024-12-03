import React from "react";
import { Dimensions, Image, StyleSheet, View, Text } from "react-native";
import CircularProgressBar from "@/components/common/CircularProgressBar";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.text}>TimeHero</Text>
        <Image
          source={require("../../assets/images/timeHeroLogo.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      {/* Black separator line */}
      <View style={styles.infoRow}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoText}>Time Earned:</Text>
          <Text style={styles.infoValue}>6 hr 18 min</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoText}>Percent of Completion:</Text>
          <View style={styles.progressContainer}>
            <CircularProgressBar completion={75} size={30} hideCenterLabel={true} />
            <Text style={styles.percentageText}>75%</Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.01,
    width: "100%", // Full width of the screen
    paddingHorizontal: "5%", // Adjust side padding
  },
  topSection: {
    flexDirection: "row", // Align title and logo in a row
    justifyContent: "space-between", // Push "TimeHero" to the left and center the logo
    alignItems: "center",
    width: "100%", // Ensure it spans the full width of the screen
  },
  image: {
    width: width * 0.2,
    height: width * 0.2,
  },
  text: {
    fontSize: 30,
    fontFamily: "sans-serif",
    color: "black",
    fontWeight: "bold",
  },
  separator: {
    width: "100%", // Full width
    height: 2, // Thin line
    backgroundColor: "black", // Black color for the line
    marginVertical: 10, // Some space around the separator
  },
  infoColumn: {
    justifyContent: "center", // Center the content vertically in the column
    alignItems: "flex-start", // Align items to the left
  },
  infoRow: {
    flexDirection: "row", // Row layout for both texts
    justifyContent: "space-between", // Space them on opposite ends
    alignItems: "center", // Align them vertically
    width: "100%", // Make the row span the full width
    paddingHorizontal: "5%", // Add padding on both sides
  },
  infoText: {
    fontSize: 12, // Smaller text size
    color: "gray", // Text color is gray
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14, // Slightly larger font size for the value
    color: "black", // Text color is black
    fontWeight: "bold", // Make it bold for emphasis
    marginTop: 2, // Add some space below "Time Earned:"
  },
  progressContainer: {
    flexDirection: "row", // Align CircularProgressBar and label in a row
    alignItems: "center", // Vertically center both elements
  },
  percentageText: {
    marginLeft: 10, // Space between the progress bar and percentage text
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
});

export default Header;
