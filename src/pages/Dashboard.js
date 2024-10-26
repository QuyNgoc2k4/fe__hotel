// src/pages/Dashboard.js
import React from "react";
import { Card, Col, Row } from "antd";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";

const Dashboard = () => {
  console.log("API ENV Variable:", process.env.REACT_APP_API);
  return (
    <div className="page">
      {/* <Header/> */}
      <Sidebar/>
    </div>
  );
};

export default Dashboard;
