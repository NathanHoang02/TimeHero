import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState, ReactNode } from "react";
import {View, Text, Button, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const TutorialContext = createContext<{
    tutorialStatus: boolean;
    endTutorial: () => void;
}>({
    tutorialStatus: false,
    endTutorial: () => {},
});

export const useTutorial = () => useContext(TutorialContext);

type TutorialProviderProps = {
    children: ReactNode;
};

export const TutorialProvider: React.FC<TutorialProviderProps> = ({ children }) => {
    const [tutorialStatus, setTutorialStatus] = useState(false);

    useEffect(() => {
        const checkFirstLogin = async () => {
            const isFirstLogin = await AsyncStorage.getItem('isFirstTime');
        
            if (isFirstLogin === null) {
                setTutorialStatus(true);
                await AsyncStorage.setItem('isFirstTime', 'false');
            }
        };

        checkFirstLogin();
    }, []);

    const endTutorial = async () => {
        setTutorialStatus(false);
    };

    return (
        <TutorialContext.Provider value = {{ tutorialStatus, endTutorial}}>
            {children} 
        </TutorialContext.Provider>
    );
};

const images = {
    screentimeP1: require('../assets/images/screentime1.jpeg'),
    screentimeP2: require('../assets/images/screentime2.jpeg'),
    downtimeP1: require('../assets/images/downtime1.jpeg'),
    downtimeP2: require('../assets/images/downtime2.jpeg'),
    allowApp: require('../assets/images/allowapp1.jpeg'),
    /*taskSetup: require('../assets/images/taskSetup.png'),
    timeSetup: require('../assets/images/timeSetup.png'),
    leaderboardSetup: require('../assets/images/leaderboardSetup.png'),
    settingsSetup: require('../assets/images/settingsSetup.png'),*/
};

type SlideshowProps = {
    endTutorial: () => void;
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

const Slideshow: React.FC<SlideshowProps> = ({ endTutorial }) => (
    <Swiper loop={false} showsButtons>
    <View style={styles.slide}>
      <Image source={images.screentimeP1} style={styles.image} />
      <Text style={styles.text}>Go to your settings and tap Screen Time.</Text>
    </View>

    <View style={styles.slide}>
      <Image source={images.screentimeP2} style={styles.image} />
      <Text style={styles.text}>Set up a passcode and tap Downtime.</Text>
    </View>

    <View style={styles.slide}>
      <Image source={images.downtimeP1} style={styles.image} />
      <Text style={styles.text}>Turn on the Schedule and Block options.</Text>
    </View>

    <View style={styles.slide}>
      <Image source={images.downtimeP2} style={styles.image} />
      <Text style={styles.text}>Edit the scheduled down time as you wish.</Text>
    </View>

    <View style={styles.slide}>
      <Image source={images.allowApp} style={styles.image} />
      <Text style={styles.text}>Go to back to Screen Time and add TimeHero to the Always Allowed apps.</Text>
      <Button title="Finish" onPress={endTutorial} />
    </View>

    {/*<View style={styles.slide}>
      <Image source={images.taskSetup} style={styles.image} />
      <Text style={styles.text}>Set up your first task!</Text>
    </View>

    <View style={styles.slide}>
      <Image source={images.timeSetup} style={styles.image} />
      <Text style={styles.text}>Monitor your progress in the time tab!</Text>
    </View>

    <View style={styles.slide}>
      <Image source={images.leaderboardSetup} style={styles.image} />
      <Text style={styles.text}>Join or create a group to compete on the leaderboard!</Text>
    </View>

    <View style={styles.slide}>
      <Image source={images.settingsSetup} style={styles.image} />
      <Text style={styles.text}>Adjust your app settings to suit your needs!</Text>
      <Button title="Finish" onPress={endTutorial} />
    </View>*/}
  </Swiper>
);

export default Slideshow;