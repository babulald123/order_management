// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Typography from '@mui/material/Typography';
// import ContainerLayout from '../layouts/ContainerLayout';
// import { fetchMenus } from '../../services/api';
// import MenuCard from './MenuCard';
// import { useCart } from '../context/CartContext';

// const MenuPage = () => {
//   const { restaurantId } = useParams();
//   const [menus, setMenus] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { cart } = useCart(); // Get cart state
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

//   useEffect(() => {
//     const getMenus = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchMenus(restaurantId, token);
//         setMenus(response.data);
//       } catch (err) {
//         setError('Failed to load menus. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     getMenus();
//   }, [restaurantId]);

//   const handleCheckout = () => {
//     navigate('/cart'); // Navigate to the CartPage
//   };

//   return (
//     <ContainerLayout title="Menu Items">
//       {error && (
//         <Typography color="error" variant="body2">
//           {error}
//         </Typography>
//       )}

//       {loading ? (
//         <Typography variant="body1" color="primary">
//           Loading menus...
//         </Typography>
//       ) : (
//         <div className="menu-list">
//           {menus.length > 0 ? (
//             menus.map((menu) => (
//               <MenuCard key={menu.id} menu={menu} restaurantId={restaurantId} />
//             ))
//           ) : (
//             <Typography variant="body1" color="textSecondary">
//               No menu items available.
//             </Typography>
//           )}
//         </div>
//       )}

//       {/* Show checkout button if cart has at least one item */}
//       {cart.length > 0 && (
//         <Typography variant="h6" style={{ marginTop: '20px', position: 'fixed', bottom: '10px', right: '10px', zIndex: 10 }}>
//           <button
//             onClick={handleCheckout}
//             style={{
//               padding: '10px 20px',
//               background: 'green',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//             }}
//           >
//             Proceed to Checkout
//           </button>
//         </Typography>
//       )}
//     </ContainerLayout>
//   );
// };

// export default MenuPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ContainerLayout from '../layouts/ContainerLayout';
import { fetchMenus } from '../../services/api';
import MenuCard from './MenuCard';
import { useCart } from '../context/CartContext';
import { Button, Grid, CircularProgress } from '@mui/material'; // Material-UI components

const MenuPage = () => {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cart } = useCart();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role'); // Fetch the user's role
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getMenus = async () => {
      setLoading(true);
      try {
        const response = await fetchMenus(restaurantId, token);
        setMenus(response.data);
      } catch (err) {
        setError('Failed to load menus. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getMenus();
  }, [restaurantId]);

  const handleCreateMenu = () => {
    navigate(`/restaurants/${restaurantId}/menus/new`);
  };

  const handleCheckout = () => {
    navigate('/cart');
  };

  return (
    <ContainerLayout title="Menu Items">
      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {/* Create Menu Button (Only for restaurant users) */}
          {userRole === 'restaurant' && (
            <div style={{ marginBottom: '20px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateMenu}
                fullWidth
                sx={{
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                Create Menu
              </Button>
            </div>
          )}

          {/* Menu List Grid */}
          <Grid container spacing={3}>
            {menus.length > 0 ? (
              menus.map((menu) => (
                <Grid item xs={12} sm={6} md={4} key={menu.id}>
                  <MenuCard
                    menu={menu.attributes}
                    restaurantId={restaurantId}
                    canManage={userRole === 'restaurant'}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary" align="center">
                  No menu items available.
                </Typography>
              </Grid>
            )}
          </Grid>

          {/* Checkout Button */}
          {cart.length > 0 && (
            <Button
              variant="contained"
              color="success"
              onClick={handleCheckout}
              fullWidth
              sx={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                maxWidth: '350px',
                zIndex: 10,
              }}
            >
              Proceed to Checkout
            </Button>
          )}
        </>
      )}
    </ContainerLayout>
  );
};

export default MenuPage;
