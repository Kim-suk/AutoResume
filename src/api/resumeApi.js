// src/api/resumeApi.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080', // Spring Boot 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitResume = async (data) => {
  return await API.post('/api/resume', data);
};
