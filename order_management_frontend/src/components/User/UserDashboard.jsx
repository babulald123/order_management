// src/components/User/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerLayout from '../layouts/ContainerLayout';
import Typography from '@mui/material/Typography';
import Button from '../common/Button';
import { fetchUserOrders } from '../../services/api';
import { CircularProgress, Grid, Card, CardContent, CardActions } from '@mui/material';

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
                <Grid item xs={12} sm={6} md={4} key={order.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Order #{order.id}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Status: {order.status}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total: ${order.total_price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/orders/${order.id}`)}
                        fullWidth
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary">
              You have no orders yet. Start by exploring restaurants!
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/restaurants')}
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Browse Restaurants
          </Button>
        </>
      )}
    </ContainerLayout>
  );
};

export default UserDashboard;
