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
export const fetchRestaurants = (token) =>
  API.get(`/api/v1/restaurants`, { headers: { Authorization: `Bearer ${token}` } });
export const createRestaurant = (data, token) =>
  API.post(`/api/v1/restaurants`, data, { headers: { Authorization: `Bearer ${token}` } });



export const fetchMenus = (restaurantId, token) => API.get(`/api/v1/restaurants/${restaurantId}/menus`, { headers: { Authorization: `Bearer ${token}` } });

export const fetchMenu = (restaurantId, menuId, token) => API.get(`/api/v1/restaurants/${restaurantId}/menus/${menuId}`, { headers: { Authorization: `Bearer ${token}` } });

// Create/Update Menu Item API
export const createMenu = (restaurantId, data, token) => API.post(`/api/v1/restaurants/${restaurantId}/menus`, data, { headers: { Authorization: `Bearer ${token}` } });
export const updateMenu = (restaurantId, menuId, data, token) =>
  API.put(`/api/v1/restaurants/${restaurantId}/menus/${menuId}`, data, { headers: { Authorization: `Bearer ${token}` } });

// Order Management API

export const updateOrderStatus = (restaurantId, orderId, status, token) =>
  API.put(`/api/v1/restaurants/${restaurantId}/orders/${orderId}`, status, { headers: { Authorization: `Bearer ${token}` } });

export const fetchOrderDetails = (restaurantId, orderId, token) =>
  API.get(`/api/v1/restaurants/${restaurantId}/orders/${orderId}`, { headers: { Authorization: `Bearer ${token}` } });

// Fetch all orders
export const fetchOrders = (restaurantId, token) =>
  API.get(`/api/v1/restaurants/${restaurantId}/orders`, { headers: { Authorization: `Bearer ${token}` } });

// Fetch all orders
export const fetchUserOrders = (token) =>
  API.get(`/api/v1/orders`, { headers: { Authorization: `Bearer ${token}` } });

// Place a new order
export const placeOrder = (userId, data, token) =>
  API.post(`/users/${userId}/orders`, data, { headers: { Authorization: `Bearer ${token}` } });

// Delete an order
export const deleteOrder = (userId, orderId, token) =>
  API.delete(`/users/${userId}/orders/${orderId}`, { headers: { Authorization: `Bearer ${token}` } });

// export const fetchOrderDetails = (userId, orderId, token) =>
//   API.get(`/users/${userId}/orders/${orderId}`, { headers: { Authorization: `Bearer ${token}` } });
