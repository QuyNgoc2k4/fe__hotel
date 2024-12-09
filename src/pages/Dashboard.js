// src/pages/Admin/Dashboard.js
import React from "react";
import PageHeading from "../components/heading";

const Dashboard = () => {
  const breadcrumb ={
    title: 'Thống kê chung',
    route: '/dashboard',
  }
  return (
    <>
    <PageHeading breadcrumb={breadcrumb}/>
    <h2>Đang chờ có dữ liệu</h2>
    </>
  )
};

export default Dashboard;
