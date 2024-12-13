// services/restaurantApi.js
import axios from 'axios';


export const login = (data) => API.post('/api/v1/users/sign_in', data);
export const signup = (data) => API.post('/api/v1/users', data);

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

export const login = (data) => {
  API.post('/api/v1/restaurants/sign_in', data);
};

export const signup = (data) => {
  API.post('/api/v1/restaurants', data);
};
