import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { firebase } from '../firebase';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Cấu hình Google Sign-In
GoogleSignin.configure({
  webClientId: '1030146136031-q852055fvhucrlihj8k5fif0423mkb3j.apps.googleusercontent.com', // Lấy từ Firebase Console
});

const Login = ({ navigation }) => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    setErrorMessage(''); // Reset error message
    if (!credential || !password) {
      setErrorMessage('Please fill in both email and password');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(credential, password)
      .then(() => {
        navigation.replace('UserAuth');  // Navigate to UserAuth after successful login
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('No user found with this email.');
        } else if (error.code === 'auth/wrong-password') {
          setErrorMessage('Incorrect password.');
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
      await firebase.auth().signInWithCredential(credential);
      navigation.replace('UserAuth');  // Navigate to UserAuth after successful login
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setErrorMessage('Sign-in was cancelled.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setErrorMessage('Sign-in is in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setErrorMessage('Play services are not available.');
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={credential}
        onChangeText={setCredential}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Login with Google" onPress={handleGoogleSignIn} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
        Don't have an account? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;
