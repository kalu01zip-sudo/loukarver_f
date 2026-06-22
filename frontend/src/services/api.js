// api.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.10.28.191:8002',
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem(
      'access_token'
    );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

export default api;