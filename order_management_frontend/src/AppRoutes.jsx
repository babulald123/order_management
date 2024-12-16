import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import UserDashboard from "./components/User/UserDashboard";
import DriverDashboard from "./components/Driver/DriverDashboard";
import ReferralForm from "./components/Referral/ReferralForm";
import RestaurantsPage from "./components/Restaurant/RestaurantsPage";
import CreateRestaurant from "./components/Restaurant/CreateRestaurant";
import MenuPage from "./components/Menu/MenuPage";
import MenuForm from "./components/Menu/MenuForm";
import MenuShow from "./components/Menu/MenuShow";
import CartPage from "./components/context/CartPage";
import CheckoutPage from "./components/context/CheckoutPage";
import OrdersPage from "./components/Order/OrdersPage";
import OrderDetailsPage from "./components/Order/OrderDetailsPage";
import RestaurantLogin from "./components/Auth/RestaurantLogin";
import RestaurantSignup from "./components/Auth/RestaurantSignup";
import OrderTrackingPage from "./components/Order/OrderTrackingPage";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/restaurants" element={<RestaurantsPage />} />
    <Route path="/restaurant/login" element={<RestaurantLogin />} />
    <Route path="/restaurant/signup" element={<RestaurantSignup />} />

    {/* Protected Routes */}
    <Route path="/users" element={ <ProtectedRoute> <UserDashboard /> </ProtectedRoute> }/>
    {/*<Route path="/drivers" element={ <ProtectedRoute> <DriverDashboard /> </ProtectedRoute> }/>*/}
    <Route path="/referral" element={ <ProtectedRoute> <ReferralForm /> </ProtectedRoute> }/>
    <Route path="/restaurants/new" element={ <ProtectedRoute> <CreateRestaurant /> </ProtectedRoute> }/>
    <Route path="/restaurants/:restaurantId/menus" element={ <ProtectedRoute> <MenuPage /> </ProtectedRoute> }/>
    <Route path="/restaurants/:restaurantId/menus/new" element={ <ProtectedRoute> <MenuForm /> </ProtectedRoute> }/>
    <Route path="/restaurants/:restaurantId/menus/:id/edit" element={ <ProtectedRoute> <MenuForm /> </ProtectedRoute> }/>
    <Route path="/restaurants/:restaurantId/menus/:id" element={ <ProtectedRoute> <MenuShow /> </ProtectedRoute> }/>
    <Route path="/restaurants/:restaurantId/orders" element={ <ProtectedRoute> <OrdersPage /> </ProtectedRoute> }/>
    <Route path="/restaurants/:restaurantId/orders/:orderId" element={ <ProtectedRoute> <OrderDetailsPage /> </ProtectedRoute> }/>
    <Route path="/cart" element={ <ProtectedRoute> <CartPage /> </ProtectedRoute> }/>
    <Route path="/checkout" element={ <ProtectedRoute> <CheckoutPage /> </ProtectedRoute> }/>
    <Route path="/order/tracking" element={ <ProtectedRoute> <OrderTrackingPage /> </ProtectedRoute> }/>
    <Route path="/users/:userId/orders/:orderId" element={ <ProtectedRoute> <OrderDetailsPage /> </ProtectedRoute> } />
  </Routes>
);

export default AppRoutes;