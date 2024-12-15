// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, TextField, Typography, Grid, Box } from '@mui/material';

// const RestaurantDashboard = () => {
//   const [restaurant, setRestaurant] = useState(null);
//   const [name, setName] = useState('');
//   const [location, setLocation] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     axios
//       .get('http://localhost:3000/api/v1/restaurants', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setRestaurant(response.data[0]);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching restaurant:', error);
//         setLoading(false);
//       });
//   }, []);

//   const handleSave = () => {
//     const token = localStorage.getItem('token');
//     const url = restaurant
//       ? `http://localhost:3000/api/v1/restaurants/${restaurant.id}`
//       : 'http://localhost:3000/api/v1/restaurants';

//     const method = restaurant ? 'put' : 'post';

//     axios({
//       method,
//       url,
//       headers: { Authorization: `Bearer ${token}` },
//       data: { restaurant: { name, location } },
//     })
//       .then((response) => {
//         setRestaurant(response.data);
//         alert('Restaurant saved successfully!');
//       })
//       .catch((error) => {
//         console.error('Error saving restaurant:', error);
//         alert('Failed to save restaurant.');
//       });
//   };

//   if (loading) return <Typography>Loading...</Typography>;

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Restaurant Dashboard
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <TextField
//             label="Name"
//             value={name || (restaurant ? restaurant.name : '')}
//             onChange={(e) => setName(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Location"
//             value={location || (restaurant ? restaurant.location : '')}
//             onChange={(e) => setLocation(e.target.value)}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button variant="contained" color="primary" onClick={handleSave}>
//             {restaurant ? 'Update Restaurant' : 'Create Restaurant'}
//           </Button>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default RestaurantDashboard;
