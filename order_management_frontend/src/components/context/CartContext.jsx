// import React, { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);  // Cart state to store items

//   // Add item to cart
//   const addToCart = (menuItem) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === menuItem.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === menuItem.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...menuItem, quantity: 1 }];
//       }
//     });
//   };

//   // Decrement quantity or remove item from cart
//   const decrementQuantity = (menuItem) => {
//     setCart((prevCart) => {
//       const updatedCart = prevCart.map((item) =>
//         item.id === menuItem.id
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       );
//       // Remove item if quantity is 0 or less
//       return updatedCart.filter((item) => item.quantity > 0);
//     });
//   };

//   // Increment quantity of a specific item
//   const incrementQuantity = (menuItem) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === menuItem.id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   // Clear the cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   const removeFromCart = (id) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, decrementQuantity, incrementQuantity, clearCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   return useContext(CartContext);
// };






import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Cart state to store items
  const [restaurantId, setRestaurantId] = useState(null); // State to store the restaurant ID

  // Add item to cart
  const addToCart = (menuItem, restaurantId) => {
    debugger
    setRestaurantId(restaurantId);  // Set the restaurant ID when adding an item
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === menuItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...menuItem, quantity: 1 }];
      }
    });
  };

  // Decrement quantity or remove item from cart
  const decrementQuantity = (menuItem) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === menuItem.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      // Remove item if quantity is 0 or less
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  // Increment quantity of a specific item
  const incrementQuantity = (menuItem) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === menuItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
    setRestaurantId(null);  // Clear the restaurant ID as well
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, restaurantId, addToCart, decrementQuantity, incrementQuantity, clearCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
