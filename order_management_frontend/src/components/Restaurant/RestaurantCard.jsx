import React from 'react';
import { Card, CardContent, Typography, CardActions } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // For navigation if needed
import Button from '../common/Button';  // Custom Button component


const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate(); // Navigation hook

  return (
    <Card sx={{ maxWidth: 345, margin: '10px' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {restaurant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {restaurant.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {restaurant.phone_number}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {restaurant.email}
        </Typography>
      </CardContent>
      <CardActions>
        {
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/restaurants/${restaurant.id}/menus`)} // Navigate to the restaurant creation page (optional)
            fullWidth
          >
            Menus
          </Button>
        }
      </CardActions>
    </Card>
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default RestaurantCard;
