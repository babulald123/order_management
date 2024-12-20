import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../common/TextField';
import Button from '../common/Button';
import ContainerLayout from '../layouts/ContainerLayout';
import Typography from '@mui/material/Typography';
import { restaurantSignup } from '../../services/restaurantApi';

const RestaurantSignup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await restaurantSignup({ restaurant: { email, password, password_confirmation: passwordConfirmation, name } });
      const token = response.data.token;
      localStorage.setItem('restaurantToken', token);
      // navigate('/dashboard');
      navigate(`/restaurants/${response.data.restaurant.id}/menus`);
    } catch (error) {
      setError(error.response?.data?.error || 'An unexpected error occurred.');
    }
  };

  return (
    <ContainerLayout title="Restaurant Signup">
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSignup}>
        Sign Up
      </Button>
    </ContainerLayout>
  );
};

export default RestaurantSignup;
