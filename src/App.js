// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import UserList from "./pages/UserList";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<UserList />} />
                </Routes>
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
