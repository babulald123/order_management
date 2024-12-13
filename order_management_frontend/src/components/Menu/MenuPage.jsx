// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom'; // For navigation and accessing params
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';  // Material-UI Button for the "Add Menu Item" button
// import ContainerLayout from '../layouts/ContainerLayout';  // Custom layout component
// import { fetchMenus } from '../../services/api';  // Service to fetch menus
// import MenuCard from './MenuCard';  // Custom MenuCard component

// const MenuPage = () => {
//   const { restaurantId } = useParams();  // Extract restaurantId from the URL params
//   const [menus, setMenus] = useState([]);  // State to store menu items
//   const [loading, setLoading] = useState(false);  // State for loading status
//   const [error, setError] = useState(null);  // State for error messages
//   const navigate = useNavigate();  // Navigation hook

//   useEffect(() => {
//     // Fetch menus for the restaurant when the component mounts
//     const getMenus = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchMenus(restaurantId);  // Fetch menus for this restaurant
//         setMenus(response.data);  // Update state with fetched menu items
//       } catch (err) {
//         setError('Failed to load menus. Please try again later.');  // Handle error
//       } finally {
//         setLoading(false);  // Set loading to false once fetching is done
//       }
//     };

//     getMenus();  // Call the function to fetch menus when the component mounts
//   }, [restaurantId]);  // Rerun this effect when restaurantId changes

//   const handleAddMenuItem = () => {
//     // Navigate to the menu form page (for creating a new menu item)
//     navigate(`/restaurants/${restaurantId}/menus/create`);
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
//               <MenuCard key={menu.id} menu={menu} restaurantId={Number(restaurantId)} />
//             ))
//           ) : (
//             <Typography variant="body1" color="textSecondary">
//               No menu items available.
//             </Typography>
//           )}
//         </div>
//       )}

//       {/* Always visible Add Menu Item Button */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleAddMenuItem}
//         fullWidth
//         sx={{ marginTop: '20px' }}  // Optional styling to add spacing
//       >
//         Add Menu Item
//       </Button>
//     </ContainerLayout>
//   );
// };

// export default MenuPage;


// src/components/Menu/MenuPage.jsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Typography from '@mui/material/Typography';
// import ContainerLayout from '../layouts/ContainerLayout';
// import { fetchMenus } from '../../services/api';
// import MenuCard from './MenuCard';
// import { useCart } from '../context/CartContext'; // To access cart state

// const MenuPage = () => {
//   const { restaurantId } = useParams(); // Extract restaurantId from URL params
//   const [menus, setMenus] = useState([]); // State for menu items
//   const [loading, setLoading] = useState(false); // State for loading status
//   const [error, setError] = useState(null); // State for error messages
//   const { cart } = useCart(); // Access the cart context
//   const navigate = useNavigate(); // For navigation

//   useEffect(() => {
//     const getMenus = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchMenus(restaurantId);
//         setMenus(response.data); // Update state with fetched menu items
//       } catch (err) {
//         setError('Failed to load menus. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     getMenus();
//   }, [restaurantId]); // Fetch menus when restaurantId changes

//   // Handle checkout button click
//   const handleCheckout = () => {
//     navigate('/cart'); // Navigate to the CartPage to review items
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

//       {/* If cart has items, show the "Proceed to Checkout" button */}
//       {cart.length > 0 && (
//         <Typography variant="h6" style={{ marginTop: '20px' }}>
//           <button onClick={handleCheckout} style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none', cursor: 'pointer' }}>
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

const MenuPage = () => {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cart } = useCart(); // Get cart state
  const navigate = useNavigate();

  useEffect(() => {
    const getMenus = async () => {
      setLoading(true);
      try {
        const response = await fetchMenus(restaurantId);
        setMenus(response.data);
      } catch (err) {
        setError('Failed to load menus. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getMenus();
  }, [restaurantId]);

  const handleCheckout = () => {
    navigate('/cart'); // Navigate to the CartPage
  };

  return (
    <ContainerLayout title="Menu Items">
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {loading ? (
        <Typography variant="body1" color="primary">
          Loading menus...
        </Typography>
      ) : (
        <div className="menu-list">
          {menus.length > 0 ? (
            menus.map((menu) => (
              <MenuCard key={menu.id} menu={menu} restaurantId={restaurantId} />
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              No menu items available.
            </Typography>
          )}
        </div>
      )}

      {/* Show checkout button if cart has at least one item */}
      {cart.length > 0 && (
        <Typography variant="h6" style={{ marginTop: '20px', position: 'fixed', bottom: '10px', right: '10px', zIndex: 10 }}>
          <button
            onClick={handleCheckout}
            style={{
              padding: '10px 20px',
              background: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Proceed to Checkout
          </button>
        </Typography>
      )}
    </ContainerLayout>
  );
};

export default MenuPage;

