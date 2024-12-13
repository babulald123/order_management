// import React from 'react';
// import { Button, Typography, Box } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete'; // Delete icon

// const OrderItem = ({ order, onCancel, onTrack }) => {
//   if (!order) return null; // In case order is undefined or null

//   return (
//     <Box
//       style={{
//         marginBottom: '20px',
//         padding: '20px',
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//       }}
//     >
//       {/* Display basic order information */}
//       <Typography variant="h6" gutterBottom>
//         Order ID: {order.id}
//       </Typography>
//       <Typography variant="body1" color="textSecondary" gutterBottom>
//         Date: {order.date}
//       </Typography>
//       <Typography variant="body1" color="textPrimary" gutterBottom>
//         Total: ${order.total}
//       </Typography>

//       {/* Show buttons to manage the order */}
//       <Box style={{ marginTop: '10px' }}>
//         <Button variant="outlined" color="primary" onClick={() => onTrack(order.id)} style={{ marginRight: '10px' }}>
//           Track Order
//         </Button>
//         <Button
//           variant="outlined"
//           color="secondary"
//           onClick={() => onCancel(order.id)}
//         >
//           Cancel Order
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default OrderItem;



import React from 'react';
import { Box, Typography } from '@mui/material';

const OrderItem = ({ order }) => {
  if (!order || !order.attributes) return null; // In case order or order.attributes is undefined or null

  // Extract attributes
  const { order_date, total, status } = order.attributes;

  return (
    <Box
      style={{
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Basic order information */}
      <Typography variant="h6" gutterBottom>
        Order ID: {order.id}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Date: {order_date}
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Status: {status}
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        Total: ${parseFloat(total).toFixed(2)} {/* Ensures total is properly formatted */}
      </Typography>
    </Box>
  );
};

export default OrderItem;
