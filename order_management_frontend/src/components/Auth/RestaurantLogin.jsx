import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../common/TextField';
import Button from '../common/Button';
import ContainerLayout from '../layouts/ContainerLayout';
import Typography from '@mui/material/Typography';
import { restaurantLogin } from '../../services/restaurantApi';

const RestaurantLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await restaurantLogin({ restaurant: { email, password } });
      const data = response.data;
      localStorage.setItem('restaurantToken', data.token);
      localStorage.setItem('restaurantId', data.restaurant.id);

      navigate(`/restaurants/${data.restaurant.id}/menus`);
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.error || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerLayout title="Restaurant Login">
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin} disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
    </ContainerLayout>
  );
};

export default RestaurantLogin;
