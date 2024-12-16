import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ReferralForm from './components/Referral/ReferralForm';
import RestaurantsPage from './components/Restaurant/RestaurantsPage';
import MenuPage from './components/Menu/MenuPage';
import MenuShow from './components/Menu/MenuShow';
import MenuForm from './components/Menu/MenuForm';
import { CartProvider } from './components/context/CartContext';
import CartPage from './components/context/CartPage';
import CheckoutPage from './components/context/CheckoutPage';
import OrdersPage from './components/Order/OrdersPage';
import OrderDetailsPage from './components/Order/OrderDetailsPage';
import RestaurantLogin from './components/Auth/RestaurantLogin';
import RestaurantSignup from './components/Auth/RestaurantSignup';
import OrderTrackingPage from './components/Order/OrderTrackingPage';

import UserDashboard from './components/User/UserDashboard';
import DriverDashboard from './components/Driver/DriverDashboard';
import CreateRestaurant from './components/Restaurant/CreateRestaurant';
import Navbar from './components/Navbar/Navbar';

const App = () => (
  <CartProvider> {/* Wrap the app with CartProvider */}
    <Router>
      <Navbar /> {/* Include Navbar here */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<UserDashboard />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/new" element={<CreateRestaurant />} />
        <Route path="/restaurants/:restaurantId/menus" element={<MenuPage />} />
        <Route path="/restaurants/:restaurantId/menus/new" element={<MenuForm />} />
        <Route path="/restaurants/:restaurantId/menus/:id/edit" element={<MenuForm />} />
        <Route path="/restaurants/:restaurantId/menus/:id/" element={<MenuShow />} />
        <Route path="/restaurants/:restaurantId/orders" element={<OrdersPage />} />
        <Route path="/restaurants/:restaurantId/orders/:orderId" element={<OrderDetailsPage />} />
        // <Route path="/restaurants/:restaurantId/orders/" element={<OrderDetailsPage />} />
        <Route path="/cart" element={<CartPage />} /> {/* Route to Cart Page */}


      </Routes>
    </Router>
  </CartProvider>
);

export default App;
