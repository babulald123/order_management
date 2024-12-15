// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Typography, IconButton, Box, Button, Divider } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import OrderItem from './OrderItem'; // Assuming this is a reusable component for displaying each order item
// import { fetchOrders, deleteOrder } from '../../services/api'; // Import API functions

// const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true); // To manage loading state
//   const [selectedOrder, setSelectedOrder] = useState(null); // To store selected order for management
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token'); // Replace with the user's authentication token
//     fetchOrders(userId, token)
//       .then((data) => {
//         setOrders(data.data.data); // Assuming API returns orders in 'data.data'
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching orders:', error);
//         setLoading(false);
//       });
//   }, []);

//   // Handle back navigation
//   const handleBack = () => {
//     navigate(-1);
//   };

//   // Handle navigate to order details page
//   const handleManageOrder = (orderId) => {
//     navigate(`/orders/${orderId}`); // Navigate to order details page
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       {/* Back Button */}
//       <IconButton onClick={handleBack} style={{ marginBottom: '20px' }}>
//         <ArrowBackIcon />
//         <Typography variant="body2" style={{ marginLeft: '10px' }}>Back</Typography>
//       </IconButton>

//       <Typography variant="h4" gutterBottom>
//         Your Orders
//       </Typography>

//       {loading ? (
//         <Typography variant="body1" color="textSecondary">
//           Loading orders...
//         </Typography>
//       ) : orders.length === 0 ? (
//         <Typography variant="body1" color="textSecondary">
//           You have no orders yet.
//         </Typography>
//       ) : (
//         <div>
//           {orders.map((order) => (
//             <Box key={order.id} mb={2} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
//               <OrderItem order={order} /> {/* Cart for each order */}
//               <Button
//                 onClick={() => handleManageOrder(order.id)}
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 style={{ marginTop: '10px' }}
//               >
//                 Manage Order
//               </Button>
//             </Box>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersPage;
