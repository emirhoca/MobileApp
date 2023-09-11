import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const URL = 'http://10.0.2.2:3000/register'; // Replace with your server's register endpoint URL

  const isEmailValid = (email) => {
    // Regular expression to match email addresses ending with @hotmail or @outlook
    const emailPattern = /@(hotmail|outlook)\.com$/i;
    return emailPattern.test(email);
  };

  const isPasswordStrong = (password) => {
    // Define your password strength criteria here
    // For example, require a minimum of 8 characters, at least one uppercase letter, one lowercase letter, and one digit
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleRegister = () => {
    if (!isEmailValid(email)) {
      setMessage('Please enter a valid email address ending with @hotmail or @outlook.');
      return;
    }

    if (!isPasswordStrong(password)) {
      setMessage('Please choose a stronger password. It should contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit.');
      return;
    }

    axios
      .post(URL, {
        email: email,
        password: password,
      })
      .then((response) => {
        // Handle a successful response from the backend
        setMessage(response.data.message);

        // Check if registration was successful
        if (response.data.result) {
          // Navigate to the HomeScreenAfterLoginned screen
          navigation.navigate('LoginScreen', {
            token: response.data.result.token, // Pass the token to the next screen if needed
            username: email, // Pass the username to the next screen if needed
          });
        }
      })
      .catch((error) => {
        // Handle errors, such as registration failure
        setMessage('Registration failed.');
        console.log('error ', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register to Coffee Lab</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}



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
