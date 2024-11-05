// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../pages/Dashboard";
import User from "../pages/user/user/View";
import PrivateRoute from "../components/PrivateRoute";

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/user/employee" element={<User />} />
        </Route>

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    );
};

export default AppRoutes;
