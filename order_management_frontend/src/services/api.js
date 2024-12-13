import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

// User Authentication API
export const login = (data) => API.post('/api/v1/users/sign_in', data);
export const signup = (data) => API.post('/api/v1/users', data);
export const sendReferral = (referral, token) =>
  API.post('/referrals', { referral }, { headers: { Authorization: `Bearer ${token}` } });

// Restaurant API
export const fetchRestaurants = () => API.get('/restaurants');
export const fetchMenus = (restaurantId) => API.get(`/restaurants/${restaurantId}/menus`, restaurantId);
export const fetchMenu = (restaurantId, menuId) => API.get(`/restaurants/${restaurantId}/menus/${menuId}`);

// Create/Update Menu Item API
export const createMenu = (restaurantId, data) => API.post(`/restaurants/${restaurantId}/menus`, data);
export const updateMenu = (restaurantId, menuId, data) =>
  API.put(`/restaurants/${restaurantId}/menus/${menuId}`, data);

// Order Management API

// Fetch all orders
export const fetchOrders = (userId, token) =>
  API.get(`/users/${userId}/orders`, { headers: { Authorization: `Bearer ${token}` } });

// Place a new order
export const placeOrder = (userId, data, token) =>
  API.post(`/users/${userId}/orders`, data, { headers: { Authorization: `Bearer ${token}` } });

// Delete an order
export const deleteOrder = (userId, orderId, token) =>
  API.delete(`/users/${userId}/orders/${orderId}`, { headers: { Authorization: `Bearer ${token}` } });

export const fetchOrderDetails = (userId, orderId, token) =>
  API.get(`/users/${userId}/orders/${orderId}`, { headers: { Authorization: `Bearer ${token}` } });
