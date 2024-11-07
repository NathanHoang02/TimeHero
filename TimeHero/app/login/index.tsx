import { ID_MAP } from '@/constants/ID_MAP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from 'react-native-login-screen';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter(); 
  
  const validUsernames: Array<keyof Record<string, string>> = Object.keys(ID_MAP) as Array<keyof Record<string, string>>;

  const handleLoginPress = async () => {
    if (validUsernames.includes(username) && password === 'password') {
      
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('userId', ID_MAP[username])
      
      router.replace('/(tabs)');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleSignupPress = () => {
    alert('Signup functionality not implemented');
  };

  return (
    <View style={styles.container}>
      <LoginScreen
        logoImageSource={require('../../assets/images/timeHeroLogo.png')}
        onLoginPress={handleLoginPress}
        onSignupPress={handleSignupPress}
        onEmailChange={setUsername}
        onPasswordChange={setPassword}
        enablePasswordValidation
        emailPlaceholder="Email"
        passwordPlaceholder="Password"
        loginButtonText="Login"
        style={styles.loginScreen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginScreen: {
  },
});

export default Login;
