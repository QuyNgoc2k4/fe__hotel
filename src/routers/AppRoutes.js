// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";
import User from "../pages/user/user/View";
import PrivateRoute from "../components/PrivateRoute";

const AppRoutes = () => {
    return (
      <Routes>
        {/* Route cho trang Login */}
        <Route path="/login" element={<Login />} />
  
        {/* Route bảo mật cho các trang quản lý (Admin) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          {/* Các route con bên trong Admin sẽ render trong phần Outlet của MainSidebar */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/user/employee" element={<User />} />
        </Route>
  
        {/* Route không tìm thấy */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    );
  };

export default AppRoutes;
