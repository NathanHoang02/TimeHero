import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Provider } from 'react-redux';
import { dispatch, store } from '../store/store';
import { setUserId } from '@/store/userSlice';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userId = await AsyncStorage.getItem('userId');

      //TODO: rework to make sure that the user's id is also stored in async storage and populate it to redux slice
      if (loggedIn === 'true' && userId) {
        router.replace('/(tabs)');
        dispatch(setUserId(userId))
      } else {
        router.replace('/login');
      }
    };

    if (loaded) {
      SplashScreen.hideAsync();
      checkLoginStatus();
    }
  }, [loaded, router]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      {/* Wrap the ThemeProvider and Stack with the Redux Provider */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
