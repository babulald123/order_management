// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // For navigation
// import { useCart } from './CartContext'; // Custom hook to access CartContext
// import { Button, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';  // Add icon
// import RemoveIcon from '@mui/icons-material/Remove';  // Remove icon
// import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Back Arrow Icon

// const CartPage = () => {
//   const { cart, incrementQuantity, decrementQuantity, clearCart, removeFromCart } = useCart(); // Access the cart and related functions
//   const [loading, setLoading] = useState(false); // Loading state for the checkout process
//   const navigate = useNavigate(); // Navigation hook

//   // Navigate to the checkout page
//   const handlePlaceOrder = async () => {
//     setLoading(true);
//     try {
//       clearCart(); // Clear the cart after placing the order
//       navigate('/order-confirmation'); // Navigate to order confirmation page
//     } catch (error) {
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle back navigation
//   const handleBack = () => {
//     navigate(-1); // Navigate to the previous page
//   };

//   // Calculate the total for each item (price * quantity)
//   const calculateItemTotal = (item) => {
//     return item.price * item.quantity;
//   };

//   // Calculate the grand total for the cart
//   const calculateGrandTotal = () => {
//     return cart.reduce((total, item) => total + calculateItemTotal(item), 0);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       {/* Back Button */}
//       <IconButton onClick={handleBack} style={{ marginBottom: '20px' }}>
//         <ArrowBackIcon />
//         <Typography variant="body2" style={{ marginLeft: '10px' }}>Back</Typography>
//       </IconButton>

//       <Typography variant="h4" gutterBottom>
//         Your Cart
//       </Typography>

//       {cart.length === 0 ? (
//         <Typography variant="body1" color="textSecondary">
//           Your cart is empty.
//         </Typography>
//       ) : (
//         <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><Typography variant="h6">Item</Typography></TableCell>
//                 <TableCell><Typography variant="h6">Price</Typography></TableCell>
//                 <TableCell><Typography variant="h6">Quantity</Typography></TableCell>
//                 <TableCell><Typography variant="h6">Total</Typography></TableCell>
//                 <TableCell><Typography variant="h6">Actions</Typography></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {cart.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>
//                     <Typography variant="body1">{item.name}</Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="body2">${item.price}</Typography>
//                   </TableCell>
//                   <TableCell>
//                     {/* Quantity Adjustments */}
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                       <IconButton
//                         onClick={() => decrementQuantity(item)}
//                         disabled={item.quantity <= 0}
//                       >
//                         <RemoveIcon />
//                       </IconButton>

//                       <Typography variant="body1" style={{ margin: '0 10px' }}>
//                         {item.quantity}
//                       </Typography>

//                       <IconButton onClick={() => incrementQuantity(item)}>
//                         <AddIcon />
//                       </IconButton>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     {/* Calculate total for each item */}
//                     <Typography variant="body2">${calculateItemTotal(item).toFixed(2)}</Typography>
//                   </TableCell>
//                   <TableCell>
//                     {/* Remove item from cart button */}
//                     <IconButton
//                       color="secondary"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       <Typography variant="body2">Remove</Typography>
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Grand Total */}
//       <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
//         <Typography variant="h6">Grand Total:</Typography>
//         <Typography variant="h6">${calculateGrandTotal().toFixed(2)}</Typography>
//       </div>

//       {/* Cart Actions */}
//       <div style={{ marginTop: '20px' }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handlePlaceOrder}
//           disabled={cart.length === 0}
//         >
//           Place Order
//         </Button>
//         <Button
//           variant="outlined"
//           color="secondary"
//           onClick={clearCart}
//           style={{ marginLeft: '10px' }}
//         >
//           Clear Cart
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { useCart } from './CartContext'; // Custom hook to access CartContext
import { Button, Typography, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';  // Add icon
import RemoveIcon from '@mui/icons-material/Remove';  // Remove icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Back Arrow Icon
import { placeOrder } from '../../services/api';

const CartPage = () => {
  const { cart, restaurantId, incrementQuantity, decrementQuantity, clearCart, loading, removeFromCart } = useCart();
  debugger
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle place order API call
  const handlePlaceOrder = async () => {
  try {
    const orderData = {
      order: {
        order_items_attributes: cart.map((item) => ({
          menu_id: item.id,
          quantity: item.quantity
        })),
        restaurant_id: restaurantId
      }
    };

    const userId = 1;
    const token = localStorage.getItem('token');

    await placeOrder(userId, orderData, token);

    // clearCart();
    navigate('/orders');
  } catch (error) {
    setError('There was an error placing your order. Please try again.');
    console.error('Error placing order:', error);
  }
};

  // Calculate total for each item (price * quantity)
  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  // Calculate the grand total for the cart
  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  return (
    <div style={{ padding: '20px' }}>
      <IconButton onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        <ArrowBackIcon />
        <Typography variant="body2" style={{ marginLeft: '10px' }}>Back</Typography>
      </IconButton>

      <Typography variant="h4" gutterBottom>Your Cart</Typography>

      {cart.length === 0 ? (
        <Typography variant="body1" color="textSecondary">Your cart is empty.</Typography>
      ) : (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">Item</Typography></TableCell>
                <TableCell><Typography variant="h6">Price</Typography></TableCell>
                <TableCell><Typography variant="h6">Quantity</Typography></TableCell>
                <TableCell><Typography variant="h6">Total</Typography></TableCell>
                <TableCell><Typography variant="h6">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography variant="body1">{item.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">${item.price}</Typography>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => decrementQuantity(item)} disabled={item.quantity <= 1}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" style={{ margin: '0 10px' }}>{item.quantity}</Typography>
                      <IconButton onClick={() => incrementQuantity(item)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">${calculateItemTotal(item).toFixed(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    {/* Remove item from cart button */}
                    <IconButton color="secondary" onClick={() => removeFromCart(item.id)}>
                      <Typography variant="body2">Remove</Typography>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Grand Total:</Typography>
        <Typography variant="h6">${calculateGrandTotal().toFixed(2)}</Typography>
      </div>

      {/* Error Message */}
      {error && <Typography variant="body2" color="error">{error}</Typography>}

      {/* Cart Actions */}
      <div style={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
          disabled={cart.length === 0 || loading}
        >
          Place Order
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={clearCart}
          style={{ marginLeft: '10px' }}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
