// import React from 'react';
// import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import Button from '../common/Button';
// import { useCart } from '../context/CartContext';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// const MenuCard = ({ menu, restaurantId }) => {
//   const navigate = useNavigate();
//   const { cart, addToCart, decrementQuantity, incrementQuantity } = useCart();

//   const isInCart = cart.some(item => item.id === menu.id);
//   const itemInCart = cart.find(item => item.id === menu.id);

//   const handleAddToCart = () => {
//     if (!isInCart) {
//       addToCart(menu, restaurantId);
//     }
//   };

//   const handleViewDetails = () => {
//     navigate(`/restaurants/${restaurantId}/menus/${menu.id}`);
//   };

//   const handleIncrementQuantity = () => {
//     incrementQuantity(menu);
//   };

//   const handleDecrementQuantity = () => {
//     decrementQuantity(menu);
//   };

//   return (
//     <Card sx={{ maxWidth: 345, margin: '10px' }}>
//       <CardContent>
//         <Typography variant="h6" component="div">
//           {menu.name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {menu.description}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Price: ${menu.price}
//         </Typography>
//       </CardContent>

//       <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleViewDetails}
//           fullWidth
//         >
//           View Details
//         </Button>

//         {!isInCart ? (
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={handleAddToCart}
//             fullWidth
//           >
//             Add to Cart
//           </Button>
//         ) : (
//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <IconButton onClick={handleDecrementQuantity} disabled={itemInCart.quantity <= 0}>
//               <RemoveIcon />
//             </IconButton>
//             <span>{itemInCart.quantity}</span>
//             <IconButton onClick={handleIncrementQuantity}>
//               <AddIcon />
//             </IconButton>
//           </div>
//         )}
//       </CardActions>
//     </Card>
//   );
// };

// MenuCard.propTypes = {
//   menu: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//   }).isRequired,
//   restaurantId: PropTypes.number.isRequired,
// };

// export default MenuCard;



import React from 'react';
import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useCart } from '../context/CartContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const MenuCard = ({ menu, restaurantId, canManage }) => {
  const navigate = useNavigate();
  const { cart, addToCart, decrementQuantity, incrementQuantity } = useCart();
  const isInCart = cart.some((item) => item.id === menu.id);
  const itemInCart = cart.find((item) => item.id === menu.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(menu, restaurantId);
    }
  };

  const handleEditMenu = () => {
    navigate(`/restaurants/${restaurantId}/menus/${menu.id}/edit`);
  };

  const handleDeleteMenu = () => {
    // Call delete menu API (not implemented here)
    console.log(`Delete menu ${menu.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '10px' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {menu.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {menu.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${menu.price}
        </Typography>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {canManage ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditMenu}
              fullWidth
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteMenu}
              fullWidth
            >
              Delete
            </Button>
          </>
        ) : (
          <>
            {!isInCart ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddToCart}
                fullWidth
              >
                Add to Cart
              </Button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => decrementQuantity(menu)} disabled={itemInCart.quantity <= 0}>
                  <RemoveIcon />
                </IconButton>
                <span>{itemInCart.quantity}</span>
                <IconButton onClick={() => incrementQuantity(menu)}>
                  <AddIcon />
                </IconButton>
              </div>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  restaurantId: PropTypes.number.isRequired,
  canManage: PropTypes.bool.isRequired,
};

export default MenuCard;
