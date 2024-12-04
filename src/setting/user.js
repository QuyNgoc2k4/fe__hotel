import { userApi } from "../api/userApi";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdLockReset } from "react-icons/md";

import { FaRegImages } from "react-icons/fa";

export const getTableColumns = (role) => {
  // Cột chung cho tất cả vai trò
  const commonColumns = [
    // {
    //   name: "ID",
    //   render: (item) => <span>{item.id}</span>,
    // },
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

  // Cột đặc biệt cho khách hàng
  if (role === "customer") {
    const customerColumns = [
      {
        name: "Gender",
        render: (item) =>
          item.Customers?.[0]?.gender ? <span>{item.Customers[0].gender}</span> : <span>Chưa có</span>,
      },
      {
        name: "Date of Birth",
        render: (item) =>
          item.Customers?.[0]?.date_of_birth ? (
            <span>{new Date(item.Customers[0].date_of_birth).toLocaleDateString()}</span>
          ) : (
            <span>Chưa có</span>
          ),
      },
      {
        name: "Identity Number",
        render: (item) =>
          item.Customers?.[0]?.identity_number ? (
            <span>{item.Customers[0].identity_number}</span>
          ) : (
            <span>Chưa có</span>
          ),
      },
      {
        name: "Address",
        render: (item) =>
          item.Customers?.[0]?.address ? <span>{item.Customers[0].address}</span> : <span>Chưa có</span>,
      },
      {
        name: "Nationality",
        render: (item) =>
          item.Customers?.[0]?.nationality ? <span>{item.Customers[0].nationality}</span> : <span>Chưa có</span>,
      },
      {
        name: "Loyalty Points",
        render: (item) =>
          item.Customers?.[0]?.loyalty_points !== undefined ? (
            <span>{item.Customers[0].loyalty_points}</span>
          ) : (
            <span>0</span>
          ),
      },
    ];

    return [...commonColumns, ...customerColumns];
  }

  // Cột đặc biệt cho nhân viên
  if (role === "staff") {
    const staffColumns = [
      {
        name: "Hotel ID",
        render: (item) =>
          item.Employees?.[0]?.hotel_id ? <span>{item.Employees[0].hotel_id}</span> : <span>Chưa có</span>,
      },
      {
        name: "Role",
        render: (item) =>
          item.Employees?.[0]?.role ? <span>{item.Employees[0].role}</span> : <span>Chưa có</span>,
      },
      {
        name: "Salary",
        render: (item) =>
          item.Employees?.[0]?.salary ? <span>${item.Employees[0].salary}</span> : <span>Chưa có</span>,
      },
      {
        name: "Start Date",
        render: (item) =>
          item.Employees?.[0]?.start_date ? (
            <span>{new Date(item.Employees[0].start_date).toLocaleDateString()}</span>
          ) : (
            <span>Chưa có</span>
          ),
      },
      {
        name: "End Date",
        render: (item) =>
          item.Employees?.[0]?.end_date ? (
            <span>{new Date(item.Employees[0].end_date).toLocaleDateString()}</span>
          ) : (
            <span>Chưa có</span>
          ),
      },
      {
        name: "ID Card Number",
        render: (item) =>
          item.Employees?.[0]?.id_card_number ? (
            <span>{item.Employees[0].id_card_number}</span>
          ) : (
            <span>Chưa có</span>
          ),
      },
      {
        name: "Education Level",
        render: (item) =>
          item.Employees?.[0]?.education_level ? (
            <span>{item.Employees[0].education_level}</span>
          ) : (
            <span>Chưa có</span>
          ),
      },
      {
        name: "Certifications",
        render: (item) =>
          item.Employees?.[0]?.certifications ? (
            <span>{item.Employees[0].certifications}</span>
          ) : (
            <span>Chưa có</span>
          ),
      },
    ];

    return [...commonColumns, ...staffColumns];
  }

  // Cột mặc định cho các vai trò khác
  return commonColumns;
};



export const buttonAction = [
  {
    path: (item) => `/user/update/${item.id}`,
    icon: <FaEdit className="text-white text-xl" />,
    className: "mr-[5px] bg-[#536485] hover:bg-[#39455c]",
    method: "update",
    onClick: (id, openSheet) => {
      if (openSheet) openSheet({ open: true, action: "update", id });
    },
  },
  {
    path: (item) => `/user/delete/${item.id}`,
    icon: <MdDeleteForever className="text-white text-xl" />,
    className: "mr-[5px] bg-[#ec4758] hover:bg-[#d03f4d]",
    method: "delete",
    onClick: (id, openDialog) => {
      if (openDialog) openDialog(id);
    },
  },
];

 // Breadcrumb
 export const breadcrumb = {
  index: {
    index: { title: "Danh sách người dùng", path: "user" },
  },
  admin: {
    index: { title: "Danh sách Admin", path: "user/admin" },
    create: { title: "Thêm Admin" },
    update: { title: "Cập nhật Admin" },
  },
  customer: {
    index: { title: "Danh sách Khách hàng", path: "user/customer" },
    create: { title: "Thêm Khách hàng" },
    update: { title: "Cập nhật Khách hàng" },
  },
  staff: {
    index: { title: "Danh sách Nhân viên", path: "user/staff" },
    create: { title: "Thêm Nhân viên" },
    update: { title: "Cập nhật Nhân viên" },
  },
};