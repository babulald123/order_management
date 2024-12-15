import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation if needed
import { createRestaurant } from '../../services/api';
import { TextField, Button, Typography, Box, Container } from '@mui/material';

const CreateRestaurant = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  const handleSubmit = (e) => {
    e.preventDefault();

    const restaurantData = { restaurant: { name, location }};

    createRestaurant(restaurantData, token)
      .then(() => {
        setSuccess('Restaurant created successfully!');
        navigate('/restaurants')
      })
      .catch((err) => {
        setError('Error creating restaurant. Please try again.');
        console.error(err);
      });
  };

  return (
    <Container maxWidth="sm" style={{ padding: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create Restaurant
        </Typography>

        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}

        {success && (
          <Typography color="success.main" variant="body2" gutterBottom>
            {success}
          </Typography>
        )}

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Restaurant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Create Restaurant
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateRestaurant;
