import React, { useState } from 'react';
import { useCart } from './CartContext'; // Custom hook to access CartContext
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart(); // Access the cart and related functions
  const [loading, setLoading] = useState(false); // Loading state for the checkout process
  const navigate = useNavigate(); // Navigation hook

  // Handle placing the order
  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // Simulate the order placement process (this would normally be an API call)
      console.log('Placing order with items:', cart);
      clearCart(); // Clear the cart after placing the order
      navigate('/order-confirmation'); // Navigate to order confirmation page
    } catch (error) {
      console.error('Order failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          Your cart is empty.
        </Typography>
      ) : (
        <div>
          <Typography variant="h6">Order Summary</Typography>
          {cart.map((item) => (
            <div key={item.id}>
              <Typography variant="body1">{item.name} x {item.quantity}</Typography>
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
