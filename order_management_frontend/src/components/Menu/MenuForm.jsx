import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '../common/TextField';  // Custom TextField component
import Button from '../common/Button';  // Custom button component
import ContainerLayout from '../layouts/ContainerLayout';  // Layout component
import { Typography } from '@mui/material';
import { fetchMenu, createMenu, updateMenu } from '../../services/api';  // API functions to fetch, create, and update menu

const MenuForm = () => {
  const { restaurantId, id } = useParams();  // Extract restaurantId and menu id from URL
  const navigate = useNavigate();  // Navigate hook to redirect after form submission

  // Form state variables
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch menu data if it's an update
  useEffect(() => {
    if (id) {
      const fetchMenuData = async () => {
        try {
          const response = await fetchMenu(restaurantId, id);  // Fetch the menu item for update
          const menuData = response.data;
          setName(menuData.name);
          setDescription(menuData.description);
          setPrice(menuData.price);
        } catch (err) {
          setError('Failed to fetch menu details');
        }
      };
      fetchMenuData();
    }
  }, [restaurantId, id]);  // Run effect when restaurantId or id changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const menuData = { name, description, price: parseFloat(price) };
      if (id) {
        // Update menu if an ID exists
        await updateMenu(restaurantId, id, menuData);
        navigate(`/restaurants/${restaurantId}/menus/${id}`);  // Redirect to the menu details page
      } else {
        // Create new menu item if no ID exists
        await createMenu(restaurantId, menuData);
        navigate(`/restaurants/${restaurantId}/menus`);  // Redirect to the menu list page
      }
    } catch (err) {
      setError('Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerLayout title={id ? 'Edit Menu Item' : 'Create Menu Item'}>
      {error && <Typography color="error" variant="body2">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          loading={loading}
        >
          {id ? 'Update Menu Item' : 'Create Menu Item'}
        </Button>
      </form>

      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate(`/restaurants/${restaurantId}/menus`)}  // Navigate back to menu list
      >
        Back to Menu List
      </Button>
    </ContainerLayout>
  );
};

export default MenuForm;
