import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import UserIndex from "../pages/user/user/View";
import HotelIndex from "../pages/hotels/hotel/View";
import AdminIndex from "../pages/user/user/AdminIndex";
import CustomerIndex from "../pages/user/user/CustomerIndex";
import StaffIndex from "../pages/user/user/StaffIndex";
import UserStore from "../pages/user/user/Store";
import PrivateRoute from "../components/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Private Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      >
        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* User Management */}
        <Route path="user/index" element={<UserIndex />} />
        <Route path="user/admin" element={<AdminIndex />} />
        <Route path="user/customer" element={<CustomerIndex />} />
        <Route path="user/staff" element={<StaffIndex />} />
        <Route path="user/create" element={<UserStore />} />

        {/* Hotel Management */}
        <Route path="hotel/index" element={<HotelIndex />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
