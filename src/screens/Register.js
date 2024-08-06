import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { firebase } from '../firebase';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    setErrorMessage(''); // Reset error message
    if (!username || !name || !email || !phone || !gender || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        firebase.firestore().collection('users').doc(user.uid).set({
          username,
          name,
          email,
          phone,
          gender,
        }).then(() => {
          navigation.replace('Login');
        }).catch((error) => {
          setErrorMessage(error.message);
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('Email is already in use.');
        } else if (error.code === 'auth/invalid-email') {
          setErrorMessage('Invalid email address.');
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
        Already have an account? Login
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

export default Register;
