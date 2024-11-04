// src/api/userApi.js
import apiClient from "./apiClient";
import { User } from "../types/User";
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever, MdLockReset } from 'react-icons/md';

const userApi = {
  getUsers: (): Promise<User[]> => apiClient.get("/users"),
  deleteUser: (id: number): Promise<void> => apiClient.delete(`/users/${id}`),
};


const tableColumn = [
    {
      name: "ID",
      render: (item: User) => <span>{item.id}</span>,
    },
    {
      name: "Avatar",
      render: (item: User) =>
        item.avatar_url ? (
          <img src={item.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            N/A
          </div>
        ),
    },
    {
      name: "Name",
      render: (item: User) => <span>{item.name || "Chưa có tên"}</span>,
    },
    {
      name: "Email",
      render: (item: User) => <span>{item.email}</span>,
    },
    {
      name: "Password",
      render: (item: User) => <span>{item.password}</span>,
    },
    {
      name: "Phone",
      render: (item: User) => <span>{item.phone || "Chưa có số điện thoại"}</span>,
    },
    {
        name: "Role",
        render: (item) =>
          typeof item.role === 'object' ? (
            <span>{item.role.name || "Chưa có vai trò"}</span>
          ) : (
            <span>{item.role || "Chưa có vai trò"}</span>
          ),
      },
  ];
const buttonAction = [
  {
    path: '/user/update',
    icon:  <FaEdit className="text-white text-xl" />,
    className: 'mr-[5px] bg-[#536485] hover:bg-[#39455c]'
  },
  {
    path: '/user/delete',
    icon:  <MdDeleteForever className="text-white text-xl" />,
    className: 'mr-[5px] bg-[#ec4758] hover:bg-[#d03f4d]'
  },
  {
    path: '/user/reset-password',
    icon:   <MdLockReset className="text-white text-xl" />,
    className: 'bg-[#f8ac59] hover:bg-[#e9a153]'
  }
]
export { userApi, tableColumn, buttonAction};
