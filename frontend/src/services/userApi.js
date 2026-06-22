// src/services/userApi.js
import api from './api';

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post('/login', data);
  return response.data;
};

export const createRelationship = async (data) => {
  const response = await api.post('/users/create', data);
  return response.data;
};

export const uploadProfilePhoto = async (imageUri) => {
  const formData = new FormData();
  // @ts-ignore - FormData in React Native accepts an object with uri, name, type
  formData.append('file', {
    uri: imageUri,
    name: 'profile.jpg',
    type: 'image/jpeg',
  });

  const response = await api.post('/users/photo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};