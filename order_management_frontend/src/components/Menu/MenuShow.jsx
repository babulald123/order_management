import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '../common/Button';  // Custom button component
import { fetchMenu } from '../../services/api';  // API service to fetch the menu item
import ContainerLayout from '../layouts/ContainerLayout';  // Custom layout component

const MenuShow = () => {
  const { restaurantId, id } = useParams();  // Extract restaurantId and menu id from URL
  const [menu, setMenu] = useState(null);  // Store menu details
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const navigate = useNavigate();  // Use navigate for redirection

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetchMenu(restaurantId, id);  // API call to fetch menu
        setMenu(response.data);
      } catch (err) {
        setError('Failed to fetch menu details');
      } finally {
        setLoading(false);  // Stop loading once the data is fetched
      }
    };

    fetchMenuData();
  }, [restaurantId, id]);  // Run effect whenever restaurantId or id changes

  if (loading) return <Typography variant="body1">Loading menu...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <ContainerLayout title="Menu Details">
      <Typography variant="h4">{menu.name}</Typography>
      <Typography variant="body1"><strong>Description:</strong> {menu.description}</Typography>
      <Typography variant="body1"><strong>Price:</strong> ${menu.price}</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/restaurants/${restaurantId}/menus/${id}/edit`)} // Navigate to the edit page
      >
        Edit Menu Item
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate(`/restaurants/${restaurantId}/menus`)} // Navigate back to the menu list
      >
        Back to Menu List
      </Button>
    </ContainerLayout>
  );
};

export default MenuShow;
