// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ContainerLayout from '../layouts/ContainerLayout'; // Layout component
// import Typography from '@mui/material/Typography'; // Material UI Typography for error messages
// import { fetchRestaurants } from '../../services/api'; // Function to fetch restaurants
// import Button from '../common/Button'; // Custom Button component
// import RestaurantCard from './RestaurantCard'; // Custom RestaurantCard component
// import { Grid, CircularProgress } from '@mui/material'; // Material UI Grid and CircularProgress for layout and loading

// const RestaurantsPage = () => {
//   const [restaurants, setRestaurants] = useState([]); // State to hold the list of restaurants
//   const [loading, setLoading] = useState(false); // State to handle loading
//   const [error, setError] = useState(null); // State to handle errors
//   const navigate = useNavigate(); // Navigation hook
//   const token = localStorage.getItem('token'); // Authentication token

//   useEffect(() => {
//     // Fetch restaurants when the component mounts
//     const getRestaurants = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchRestaurants(token); // Fetch restaurant data
//         setRestaurants(response.data); // Update state with fetched data
//       } catch (err) {
//         setError('Failed to fetch restaurants. Please try again later.'); // Set error state
//       } finally {
//         setLoading(false); // Set loading to false once data is fetched
//       }
//     };

//     getRestaurants(); // Call the function to fetch restaurants
//   }, [token]);

//   return (
//     <ContainerLayout title="Restaurants">
//       {error && (
//         <Typography color="error" variant="body2">
//           {error}
//         </Typography>
//       )}

//       {loading ? (
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//           <CircularProgress />
//         </div>
//       ) : (
//         <div className="restaurant-list">
//           {restaurants.length > 0 ? (
//             <Grid container spacing={3}>
//               {restaurants.map((restaurant) => (
//                 <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
//                   <RestaurantCard restaurant={restaurant.attributes} />
//                 </Grid>
//               ))}
//             </Grid>
//           ) : (
//             <Typography variant="body1" color="textSecondary">
//               No restaurants available.
//             </Typography>
//           )}
//         </div>
//       )}

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => navigate('/restaurants/new')} // Navigate to the restaurant creation page
//         fullWidth
//         sx={{ marginTop: 3 }}
//       >
//         Add Restaurant
//       </Button>

//       <style jsx>{`
//         .restaurant-list {
//           margin-top: 20px;
//         }
//       `}</style>
//     </ContainerLayout>
//   );
// };

// export default RestaurantsPage;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerLayout from '../layouts/ContainerLayout';
import Typography from '@mui/material/Typography';
import { fetchRestaurants } from '../../services/api';
import Button from '../common/Button';
import RestaurantCard from './RestaurantCard';
import { Grid, CircularProgress } from '@mui/material';
import { isRole } from '../../services/roleHelper'; // Helper to check role

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const canManage = isRole('restaurant'); // Check if the user is a restaurant owner

  useEffect(() => {
    const getRestaurants = async () => {
      setLoading(true);
      try {
        const response = await fetchRestaurants(token);
        setRestaurants(response.data);
      } catch (err) {
        setError('Failed to fetch restaurants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getRestaurants();
  }, [token]);

  return (
    <ContainerLayout title="Restaurants">
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
        <div className="restaurant-list">
          {restaurants.length > 0 ? (
            <Grid container spacing={3}>
              {restaurants.map((restaurant) => (
                <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
                  <RestaurantCard restaurant={restaurant.attributes} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No restaurants available.
            </Typography>
          )}
        </div>
      )}

      {canManage && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/restaurants/new')}
          fullWidth
          sx={{ marginTop: 3 }}
        >
          Add Restaurant
        </Button>
      )}
    </ContainerLayout>
  );
};

export default RestaurantsPage;
