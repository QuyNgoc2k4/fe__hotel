import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { userApi } from "../api/userApi";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import MainSidebar from "../layouts/MainSidebar";
import "../styles/global.css";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Tự kiểm tra kích thước màn hình và điều chỉnh trạng thái Sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // Mở sidebar nếu màn hình lớn hơn hoặc bằng 768px
    };

    handleResize(); // Gọi lần đầu để kiểm tra kích thước ban đầu
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch user info using useQuery
  const { data: userInfo, refetch, isLoading, isError } = useQuery(
    ["userInfo"],
    async () => {
      const response = await userApi.getUserInfo();
      return response;
    },
    {
      refetchInterval: 5000, // Tự động làm mới sau mỗi 5 giây
    }
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-500`}>
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          userInfo={userInfo || { name: "Guest", management_level: "Visitor" }}
        />
        <div
          className={`main-content p-4 overflow-auto ${
            isSidebarOpen ? "" : "sidebar-hidden"
          }`}
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error loading user info.</div>
          ) : (
            <MainSidebar />
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Admin;
