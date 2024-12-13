import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Divider, Card, CardContent, Grid } from '@mui/material';
import { fetchOrderDetails } from '../../services/api'; // Assuming you have this API function
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OrderDetailsPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams(); // Get order ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    const userId = 1; // Replace with logged-in user ID
    const token = localStorage.getItem('token'); // Replace with user's token

    // Fetch order details
    fetchOrderDetails(userId, orderId, token)
      .then((response) => {
        setOrder(response.data); // Assuming the order data is in 'data' field
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching order:', error);
        setLoading(false);
      });
  }, [orderId]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleCancelOrder = () => {
    alert('Cancel order functionality'); // Implement your cancel order logic
  };

  const handleTrackOrder = () => {
    alert('Track order functionality'); // Implement your track order logic
  };

  // Function to safely format price
  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return !isNaN(numericPrice) ? numericPrice.toFixed(2) : '0.00';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Back Button */}
      <Button
        onClick={handleBack}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        style={{ marginBottom: '20px' }}
      >
        Back to Orders
      </Button>

      {loading ? (
        <Typography variant="body1" color="textSecondary">
          Loading order details...
        </Typography>
      ) : order ? (
        <div>
          {/* Order Header */}
          <Typography variant="h4" gutterBottom style={{ fontWeight: '600', marginBottom: '20px' }}>
            Order Details
          </Typography>

          {/* Order Summary Card */}
          <Card style={{ marginBottom: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: '600' }}>
                Order ID: {order.id}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Order Date: {new Date(order.attributes.order_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Status: <span style={{ fontWeight: 'bold', color: 'green' }}>{order.attributes.status}</span>
              </Typography>
            </CardContent>
          </Card>

          {/* Order Items List */}
          <Typography variant="h5" gutterBottom style={{ fontWeight: '600' }}>
            Items in Your Order
          </Typography>

          {/* Grid Layout for Items */}
          <Grid container spacing={2}>
            {order.attributes.order_items && order.attributes.order_items.length > 0 ? (
              order.attributes.order_items.map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <CardContent>
                      <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        {item.menu.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.menu.description}
                      </Typography>
                      <Divider style={{ margin: '10px 0' }} />
                      <Typography variant="body2">Quantity: {item.quantity}</Typography>
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                        Price: ${formatPrice(item.menu.price)}
                      </Typography>
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                        Total: ${formatPrice(item.menu.price) * item.quantity}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No items available for this order.
              </Typography>
            )}
          </Grid>

          {/* Order Total Section */}
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h5" style={{ fontWeight: '600', marginBottom: '10px' }}>
            Total: ${formatPrice(order.attributes.total)}
          </Typography>

          {/* Action Buttons */}
          <Box mt={2} style={{ display: 'flex', gap: '20px' }}>
            <Button
              onClick={handleCancelOrder}
              variant="contained"
              color="secondary"
              style={{ flex: 1 }}
            >
              Cancel Order
            </Button>
            <Button
              onClick={handleTrackOrder}
              variant="contained"
              color="primary"
              style={{ flex: 1 }}
            >
              Track Order
            </Button>
          </Box>
        </div>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Order not found.
        </Typography>
      )}
    </div>
  );
};

export default OrderDetailsPage;
