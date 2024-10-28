
import React from "react";
import { Card, Col, Row } from "antd";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import MainSidebar from "../layouts/MainSidebar";
import "../styles/global.css";

const Admin = () => {
  return (
    <div className="page">
      <Header/>
      <Sidebar/>
      <div className="main-content">
          <MainSidebar/>
      </div>
    </div>
  );
};

export default Admin;
