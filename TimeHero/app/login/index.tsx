import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from 'react-native-login-screen';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const router = useRouter(); // Get router object

  const handleLoginPress = () => {
    if (username === 'user' && password === 'password') {
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
    // Override default styles if necessary
  },
});

export default Login;
