// src/layouts/DashboardLayout.js
import React from "react";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");

    // Điều hướng về trang đăng nhập
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div
          className="logo"
          style={{
            height: "32px",
            background: "rgba(255, 255, 255, 0.2)",
            margin: "16px",
          }}
        />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
            Đăng Xuất
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }} />
        <Content style={{ margin: "16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design Dashboard ©2024
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
