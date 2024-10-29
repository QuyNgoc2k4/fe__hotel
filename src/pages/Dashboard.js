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
    </>
  )
};

export default Dashboard;
