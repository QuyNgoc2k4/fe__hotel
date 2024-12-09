import React from "react";
import { Routes, Route } from "react-router-dom";
// pages/
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

// pages/user
import UserIndex from "../pages/user/user/View";
import AdminIndex from "../pages/user/user/AdminIndex";
import CustomerIndex from "../pages/user/user/CustomerIndex";
import StaffIndex from "../pages/user/user/StaffIndex";
import UserStore from "../pages/user/user/Store";

// pages/hotel
import HotelIndex from "../pages/hotels/hotel/View";
import HotelImage from "../pages/hotels/hotel/Album";

// pages/room
import RoomIndex from "../pages/rooms/room/View";
import RoomType from "../pages/rooms/roomTypes/View";
import RoomImage from "../pages/rooms/room/Album";

// pages/others/services
import ServiceIndex from "../pages/others/services/View";
import VoucherIndex from "../pages/others/vouchers/View";

// pages/booking/room_available
import RoomAvailable from "../pages/booking/room/RoomAvailable";
import BookingIndex from "../pages/booking/booking/View";

// pages/account
import Profile from "../pages/acount/profile";

// components
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
        <Route path="/" element={<Dashboard />} />

        {/* User Management */}
        <Route path="user/index" element={<UserIndex />} />
        <Route path="user/admin" element={<AdminIndex />} />
        <Route path="user/customer" element={<CustomerIndex />} />
        <Route path="user/staff" element={<StaffIndex />} />
        <Route path="user/create" element={<UserStore />} />

        {/* Hotel Management */}
        <Route path="hotel/index" element={<HotelIndex />} />
        <Route path="hotel-images/:hotelId" element={<HotelImage />} />

        {/* Room Management */}
        <Route path="room/index" element={<RoomIndex />} />
        <Route path="room/room-types" element={<RoomType />} />
        <Route path="room-images/:roomId" element={<RoomImage />} />

        {/* Orthers Management */}
        <Route path="services" element={<ServiceIndex />} />
        <Route path="vouchers" element={<VoucherIndex />} />

        {/* Booking */}
        <Route path="room-available" element={<RoomAvailable />} />
        <Route path="list-booking" element={<BookingIndex />} />

        {/* Account */}
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
