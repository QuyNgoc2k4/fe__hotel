import { serviceApi } from "../api/serviceApi";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

// Table Columns
export const tableColumn = [
  { name: "Tên dịch vụ", render: (service) => <span>{service.name}</span> },
  { name: "Giá", render: (service) => <span>{service.price} VNĐ</span> },
  { name: "Mô tả", render: (service) => <span>{service.description}</span> },
  { name: "Loại dịch vụ", render: (service) => <span>{service.service_type}</span> },
  {
    name: "Khả dụng",
    render: (service) => (
      <span className={`px-2 py-1 text-white rounded ${service.available ? "bg-green-500" : "bg-red-500"}`}>
        {service.available ? "Có" : "Không"}
      </span>
    ),
  },
];

// Button Actions
export const buttonAction = [
  {
    path: (service) => `/services/edit/${service.id}`,
    icon: <FaEdit className="text-white text-xl" />,
    className: "mr-[5px] bg-[#536485] hover:bg-[#39455c]",
    method: "update",
    onClick: (id, openSheet) => {
      if (openSheet) openSheet({ open: true, action: "update", id });
    },
  },
  {
    path: (service) => `/services/delete/${service.id}`,
    icon: <MdDeleteForever className="text-white text-xl" />,
    className: "mr-[5px] bg-[#ec4758] hover:bg-[#d03f4d]",
    method: "delete",
    onClick: (id, openDialog) => {
      if (openDialog) openDialog(id); // Open confirmation dialog
    },
  },
];

// Breadcrumbs
export const breadcrumb = {
  index: {
    title: "Quản lý dịch vụ",
    to: "/services/index",
  },
  create: {
    title: "Thêm mới dịch vụ",
    to: "/services/create",
  },
  edit: {
    title: "Chỉnh sửa dịch vụ",
    to: "/services/edit",
  },
  update: {
    title: "Cập nhật thông tin dịch vụ",
  },
};
