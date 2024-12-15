// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const userRole = localStorage.getItem('role'); // Get the user role (restaurant, user, etc.)

//   return (
//     <AppBar position="sticky">
//       <Toolbar>
//         {/* Logo or App Name */}
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Order Management
//         </Typography>

//         {/* Navigation Links */}
//         <Box>
//           {/* Show Home link for everyone */}
//           <Button color="inherit" component={Link} to="/">
//             Home
//           </Button>

//           {/* Show Restaurant-specific links */}
//           {userRole === 'restaurant' && (
//             <>
//               <Button color="inherit" component={Link} to="/restaurants">
//                 My Restaurants
//               </Button>
//               <Button color="inherit" component={Link} to="/restaurants/new">
//                 Add Restaurant
//               </Button>
//             </>
//           )}

//           {/* Show Cart link for users and restaurant */}
//           <Button color="inherit" component={Link} to="/cart">
//             Cart
//           </Button>

//           {/* Show Login/Logout based on the user role */}
//           {userRole ? (
//             <Button color="inherit" onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); window.location.reload(); }}>
//               Logout
//             </Button>
//           ) : (
//             <Button color="inherit" component={Link} to="/login">
//               Login
//             </Button>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;



import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const userRole = localStorage.getItem('role'); // Get the user role (restaurant, user, etc.)
  const location = useLocation(); // Get the current location (route)

  // Determine if the "Create" button should be displayed and what type
  // const isRestaurantPage = location.pathname.includes('/restaurants');
  // const isMenuPage = location.pathname.includes('/menus');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Logo or App Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Order Management
        </Typography>
        {/* Back Button */}
        {
          <Button
            color="inherit"
            onClick={handleBack}
            style={{ marginRight: '20px' }}
          >
            Back
          </Button>
        }
        {/* Navigation Links */}
        <Box>
          {/* Show Home link for everyone */}
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          {/* Show Restaurant-specific links */}
          {userRole === 'restaurant' && (
            <>
              <Button color="inherit" component={Link} to="/restaurants">
                My Restaurants
              </Button>
              <Button color="inherit" component={Link} to="/orders">
                My orders
              </Button>
              {/* Conditional "Create" button */}
             {/* {(isRestaurantPage || isMenuPage) && userRole === 'restaurant' && (
                <Button
                  color="inherit"
                  component={Link}
                  to={isRestaurantPage ? '/restaurants/new' : `/restaurants/${location.pathname.split('/')[2]}/menus`}
                >
                  {isRestaurantPage ? 'Create Restaurant' : 'Create Menu'}
                </Button>
              )}*/}
            </>
          )}

          {/* Show Cart link for users and restaurant */}
          <Button color="inherit" component={Link} to="/cart">
            Cart
          </Button>

          {/* Show Login/Logout based on the user role */}
          {userRole ? (
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                window.location.reload();
              }}
            >
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
