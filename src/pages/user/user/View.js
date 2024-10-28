// src/pages/Admin/User.js
import React from "react";
import PageHeading from "../../../components/heading";

const User = () => {
  const breadcrumb ={
    title: 'Quản lý nhân viên',
    to: '/user/index'
  }
  return (
    <>
      <PageHeading breadcrumb={breadcrumb}/>
    </>
  )
};

export default User;
