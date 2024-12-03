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
      <View style={styles.infoRow}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoText}>Time Earned:</Text>
          <Text style={styles.infoValue}>6 hr 18 min</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoText}>Percent of Completion:</Text>
          <View style={styles.progressContainer}>
            <CircularProgressBar 
            completion={75} 
            size={30} 
            hideCenterLabel={true}
             />
            <Text style={styles.percentageText}>75%</Text>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <Text style={styles.activeTasksTitle}>Active Tasks</Text>
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
    width: "100%", 
    paddingHorizontal: "5%", 
  },
  topSection: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    width: "100%", 
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
    width: "100%", 
    height: 2, 
    backgroundColor: "black", 
    marginVertical: 10, 
  },
  infoColumn: {
    justifyContent: "center", 
    alignItems: "flex-start", 
  },
  infoRow: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    width: "100%", 
    paddingHorizontal: "5%", 
  },
  infoText: {
    fontSize: 12, 
    color: "gray", 
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14, 
    color: "black", 
    fontWeight: "bold", 
    marginTop: 2, 
  },
  progressContainer: {
    flexDirection: "row", 
    alignItems: "center", 
  },
  percentageText: {
    marginLeft: 10, 
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  activeTasksTitle: {
    fontSize: 18, 
    fontWeight: "bold", 
    color: "black", 
    textAlign: "left", 
    width: "100%", 
    marginTop: 10, 
    marginLeft: 30,
  },
});

export default Header;
