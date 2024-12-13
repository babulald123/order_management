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
import RestaurantLogin from './components/auth/RestaurantLogin';
import RestaurantSignup from './components/auth/RestaurantSignup';


const App = () => (
  <CartProvider> {/* Wrap the app with CartProvider */}
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/referral" element={<ReferralForm />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:restaurantId/menus" element={<MenuPage />} />
        <Route path="/restaurants/:restaurantId/menus/:id" element={<MenuShow />} />
        <Route path="/restaurants/:restaurantId/menus/new" element={<MenuForm />} />
        <Route path="/restaurants/:restaurantId/menus/:id/edit" element={<MenuForm />} />
        <Route path="/restaurants/:restaurantId/menus/create" element={<MenuForm />} />
        <Route path="/cart" element={<CartPage />} /> {/* Route to Cart Page */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
        <Route path="/restaurant/login" element={<RestaurantLogin />} />
        <Route path="/restaurant/signup" element={<RestaurantSignup />} />

      </Routes>
    </Router>
  </CartProvider>
);

export default App;
