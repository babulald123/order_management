import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

export const restaurantLogin = (data) => API.post('/api/v1/restaurants/sign_in', data);

export const restaurantSignup = (data) => API.post('/api/v1/restaurants', data);
