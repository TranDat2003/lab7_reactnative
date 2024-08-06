import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserAuth = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    auth().signOut().then(() => navigation.replace('Login'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Authentication</Text>
      {userData ? (
        <View style={styles.userInfo}>
          <Text style={styles.infoText}>Username: {userData.username}</Text>
          <Text style={styles.infoText}>Name: {userData.name}</Text>
          <Text style={styles.infoText}>Email: {userData.email}</Text>
          <Text style={styles.infoText}>Phone: {userData.phone}</Text>
          <Text style={styles.infoText}>Gender: {userData.gender}</Text>
        </View>
      ) : (
        <Text>Loading user data...</Text>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UserAuth;
