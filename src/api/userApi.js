//src/api/userApi.js
import apiClient from "./apiClient";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdLockReset } from "react-icons/md";



const createUser = async (formData) => {
  try {
    const response = await apiClient.post("/users/create-admin", formData, {
     
    });

    // console.log("Tạo Admin thành công:", response.data);
    return response.data;
  } catch (error) {
    // console.error("Lỗi khi tạo Admin:", error.response?.data || error.message);
    throw error;
  }
};

// API quản lý người dùng
const userApi = {
  // Lấy danh sách người dùng
  getUsers: (page = 1, limit = 10, queryString = "") =>
    apiClient.get(`/users?page=${page}&limit=${limit}${queryString}`).then((response) => response.data.data),
  

  // Tìm kiếm người dùng
  searchUsers: (queryString) =>
    apiClient.get(`/users/search?${queryString}`).then((response) => response.data.data),

  
};

// Breadcrumbs
const breadcrumb = {
  index: {
    title: "Quản lý người dùng",
    to: "/user/index",
  },
  create: {
    title: "Thêm mới thành viên",
    to: "/user/create",
  },
  staff: {
    title: "Quản lý nhân viên",
    to: "/user/staff",
  },
  customer: {
    title: "Quản lý khách hàng",
    to: "/user/customer",
  },
  admin: {
    title: "Quản lý admin",
    to: "/user/admin",
  },
};

// Cấu hình bảng danh sách người dùng
const tableColumn = [
  {
    name: "ID",
    render: (item) => <span>{item.id}</span>,
  },
  {
    name: "Avatar",
    render: (item) =>
      item.avatar_url ? (
        <img src={item.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">N/A</div>
      ),
  },
  {
    name: "Name",
    render: (item) => <span>{item.name || "Chưa có tên"}</span>,
  },
  {
    name: "Email",
    render: (item) => <span>{item.email}</span>,
  },
  {
    name: "Phone",
    render: (item) => <span>{item.phone || "Chưa có số điện thoại"}</span>,
  },
  {
    name: "Role",
    render: (item) =>
      typeof item.role === "object" ? (
        <span>{item.role.name || "Chưa có vai trò"}</span>
      ) : (
        <span>{item.role || "Chưa có vai trò"}</span>
      ),
  },
];

// Hành động trên mỗi dòng của bảng
const buttonAction = [
  {
    path: (item) => `/user/update/${item.id}`, // path là một hàm
    icon: <FaEdit className="text-white text-xl" />,
    className: "mr-[5px] bg-[#536485] hover:bg-[#39455c]",
  },
  {
    path: (item) => `/user/delete/${item.id}`, // path là một hàm
    icon: <MdDeleteForever className="text-white text-xl" />,
    className: "mr-[5px] bg-[#ec4758] hover:bg-[#d03f4d]",
  },
  {
    path: (item) => `/user/reset-password/${item.id}`, // path là một hàm
    icon: <MdLockReset className="text-white text-xl" />,
    className: "bg-[#f8ac59] hover:bg-[#e9a153]",
  },
];


export { userApi, tableColumn, buttonAction, breadcrumb, createUser };
