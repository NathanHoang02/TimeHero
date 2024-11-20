import CircularProgressBar from "@/components/common/CircularProgressBar";
import Header from "@/components/common/Header";
import React from "react";
import { Dimensions, Image, Platform, StyleSheet } from "react-native";

const HomeScreenContent = () => {
  return (
    <div style={styles.container}>
      <Header />
    </div>
  );
};

export default HomeScreenContent;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.01,
  },
});
