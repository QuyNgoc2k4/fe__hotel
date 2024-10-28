// src/layouts/MainSidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import { Outlet } from "react-router-dom";

const MainSidebar = () => {
  return (
    <div className="main-sidebar">
      {/* Outlet sẽ render nội dung của các route con (Dashboard, User, ...) */}
      <Outlet />
    </div>
  );
};

export default MainSidebar;
