import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <div style={styles.headerContainer}>
      <p style={styles.text}>TimeHero</p>
      <Image
        source={require("../assets/images/timeHeroLogo.png")} // Image URL or local path
        style={styles.image} // Apply styles to the image
        resizeMode="cover" // Controls how the image is scaled (cover, contain, stretch, etc.)
      />
    </div>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * .01,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    width: width * .2,   // Set the width of the image
    height: width * .2,  // Set the height of the image
  },
  text: {
      fontSize: 30,
      fontFamily: 'sans-serif',
      color: 'black',
      paddingLeft: '3%',
      fontWeight: 'bold'
  }
});

export default Header;
