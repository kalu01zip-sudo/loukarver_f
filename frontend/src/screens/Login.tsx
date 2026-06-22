import { Colors } from '@/constants/colors';

import { loginUser } from '@/services/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type RootStackParamList = {
  ModeSelector: undefined;
  AlignedWelcome: undefined;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    try {
      setLoading(true);
      const data = await loginUser(email, password);

      await AsyncStorage.setItem(
        'access_token',
        data.access_token
      );

      await AsyncStorage.setItem(
        'refresh_token',
        data.refresh_token
      );

      console.log('Login Success');
      console.log(data);
      navigation.navigate('AlignedWelcome');

      const token = await AsyncStorage.getItem('access_token');
      console.log('Saved Token:', token);

    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response?.data?.detail || error.message || 'An error occurred during login.';
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back</Text>

      <Text style={styles.subHeading}>
        Login to continue using the app
      </Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          Don't have an account?
        </Text>

        <TouchableOpacity>
          <Text style={styles.signupButton}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    backgroundColor: Colors.bone,
  },

  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },

  subHeading: {
    fontSize: 15,
    color: '#666',
    marginBottom: 35,
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },

  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 25,
  },

  forgotText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },

  loginButton: {
    backgroundColor: '#007AFF',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  signupText: {
    color: '#666',
    fontSize: 15,
  },

  signupButton: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '700',
  },
});