import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { CartProvider } from "./components/context/CartContext";
import AppRoutes from "./AppRoutes"; // Import the routes

const App = () => (
  <CartProvider>
    <Router>
      <Navbar />
      <AppRoutes /> {/* Use the separated routes */}
    </Router>
  </CartProvider>
);

export default App;
