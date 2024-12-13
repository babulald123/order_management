import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation if needed
import ContainerLayout from '../layouts/ContainerLayout';  // Layout component
import Typography from '@mui/material/Typography';  // Material UI Typography for error messages
import { fetchRestaurants } from '../../services/api';  // Function to fetch restaurants
import Button from '../common/Button';  // Custom Button component
import RestaurantCard from './RestaurantCard';  // Custom RestaurantCard component

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]); // State to hold the list of restaurants
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    // Fetch restaurants when the component mounts
    const getRestaurants = async () => {
      setLoading(true);
      try {
        const response = await fetchRestaurants();  // Fetch restaurant data
        setRestaurants(response.data);  // Update state with fetched data
      } catch (err) {
        setError('Failed to fetch restaurants. Please try again later.'); // Set error state
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    getRestaurants(); // Call the function to fetch restaurants
  }, []);

  return (
    <ContainerLayout title="Restaurants">
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {loading ? (
        <Typography variant="body1" color="primary">
          Loading restaurants...
        </Typography>
      ) : (
        <div className="restaurant-list">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No restaurants available.
            </Typography>
          )}
        </div>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/restaurants/create')} // Navigate to the restaurant creation page (optional)
        fullWidth
      >
        Add Restaurant
      </Button>

      <style jsx>{`
        .restaurant-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 20px;
        }
      `}</style>
    </ContainerLayout>
  );
};

export default RestaurantsPage;
