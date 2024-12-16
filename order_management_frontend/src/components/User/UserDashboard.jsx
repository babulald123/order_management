import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerLayout from '../layouts/ContainerLayout';
import Typography from '@mui/material/Typography';
import Button from '../common/Button';
import { fetchUserOrders } from '../../services/api';
import { CircularProgress, Grid, Box } from '@mui/material';
import OrderItem from '../Order/OrderItem';

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getUserOrders = async () => {
      setLoading(true);
      try {
        const response = await fetchUserOrders(token);
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getUserOrders();
  }, [token]);

  // Handle navigate to order details page
  const handleManageOrder = (order) => {
    navigate(`/users/${order.attributes.user_id}/orders/${order.id}`); // Navigate to order details page
  };

  return (
    <ContainerLayout title="User Dashboard">
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Your Orders
          </Typography>

          {orders.length > 0 ? (
            <Grid container spacing={3}>
              {orders.map((order) => (
                <Box key={order.id} mb={5} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
                  <OrderItem order={order} /> {/* Cart for each order */}
                  <Button
                    onClick={() => handleManageOrder(order)}
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '10px' }}
                  >
                    Manage Order
                  </Button>
                </Box>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary">
              You have no orders yet. Start by exploring menus and placing an order!
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/restaurants')} // Consider updating route if needed
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Explore Menus
          </Button>
        </>
      )}
    </ContainerLayout>
  );
};

export default UserDashboard;
