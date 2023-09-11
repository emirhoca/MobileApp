import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import checkTokenStatus from './checkTokenStatus';
import { useEffect } from 'react';

const LoginScreen = ({ navigation, route, updateIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const URL = 'http://10.0.2.2:3000/login';

  const handleLogin = async () => {
    try {
      const response = await axios.post(URL, {
        email: email,
        password: password,
      });

      setMessage(response.data.message);

      if (response.data.token) {
        const isAuthenticated = await checkTokenStatus(response.data.token);

        if (isAuthenticated) {
          // Update the isLoggedIn state in the parent component
          updateIsLoggedIn(true);
          navigation.replace('HomeScreenForLoginned', {
            token: response.data.token,
            username: email,
          });
        } else {
          setMessage('Authentication failed.');
        }
      } else {
        setMessage('No token received.');
      }
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In to Coffee Lab</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Click here to register"
          onPress={() => navigation.navigate('RegisterScreen')}
        />
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // You can customize the background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'green', // Customize the button color
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white', // Customize the text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 10,
    color: 'red', // Customize the error message color
  },
});

export default LoginScreen;
