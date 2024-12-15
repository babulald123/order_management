import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Card, CardContent, Box, CircularProgress, Grid } from '@mui/material';  // Material UI components
import { fetchMenu } from '../../services/api';  // API service to fetch the menu item
import ContainerLayout from '../layouts/ContainerLayout';  // Custom layout component

const MenuShow = () => {
  const { restaurantId, id } = useParams();  // Extract restaurantId and menu id from URL
  const [menu, setMenu] = useState(null);  // Store menu details
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const navigate = useNavigate();  // Use navigate for redirection
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetchMenu(restaurantId, id, token);  // API call to fetch menu
        setMenu(response.data.attributes);
      } catch (err) {
        setError('Failed to fetch menu details');
      } finally {
        setLoading(false);  // Stop loading once the data is fetched
      }
    };

    fetchMenuData();
  }, [restaurantId, id]);  // Run effect whenever restaurantId or id changes

  // If loading, show a spinner
  if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;

  // If error, display error message
  if (error) return <Typography color="error" variant="body1" align="center">{error}</Typography>;

  return (
    <ContainerLayout title="Menu Details">
      {/* Card to display menu details */}
      <Card sx={{ maxWidth: 600, margin: 'auto', padding: 2, boxShadow: 3 }}>
        <CardContent>
          {/* Menu Name */}
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            {menu.name}
          </Typography>

          {/* Description */}
          <Typography variant="body1" color="textSecondary" paragraph>
            <strong>Description:</strong> {menu.description}
          </Typography>

          {/* Price */}
          <Typography variant="h6" color="secondary" align="center" paragraph>
            <strong>Price:</strong> ${parseFloat(menu.price).toFixed(2)}
          </Typography>

          {/* Button Section */}
          <Grid container spacing={2} justifyContent="center" mt={3}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate(`/restaurants/${restaurantId}/menus/${id}/edit`)} // Navigate to the edit page
              >
                Edit Menu Item
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate(`/restaurants/${restaurantId}/menus`)} // Navigate back to the menu list
              >
                Back to Menu List
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ContainerLayout>
  );
};

export default MenuShow;
