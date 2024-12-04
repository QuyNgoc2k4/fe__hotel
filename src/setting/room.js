import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaRegImages } from "react-icons/fa";
import RoomTypeName from "../components/RoomTypeName";

export const tableColumn = [
  { name: "Số phòng", render: (room) => <span>{room.room_number}</span> },
  {
    name: "Loại phòng",
    render: (room) => <RoomTypeName roomTypeId={room.room_type_id} />, // Sử dụng RoomTypeName
  },
  { name: "Tầng", render: (room) => <span>{room.floor}</span> },
  {
    name: "Avatar",
    render: (room) =>
      room.avatar_url ? (
        <img src={room.avatar_url} alt="Avatar" className="w-10 h-10" />
      ) : (
        <div className="w-10 h-10 bg-gray-300 flex items-center justify-center">
          N/A
        </div>
      ),
  },
  { name: "Mô tả", render: (room) => <span>{room.description}</span> },
  {
    name: "Giá",
    render: (room) => <span>{room.current_price.toLocaleString()} VND</span>,
  },
  {
    name: "Trạng thái",
    render: (room) => (
      <span
        className={`px-2 py-1 rounded ${
          room.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {room.status ? "Hoạt động" : "Không hoạt động"}
      </span>
    ),
  },
  {
    name: "Sử dụng thuốc lá",
    render: (room) => (
      <span
        className={`px-2 py-1 rounded ${
          room.is_smoking
            ? "bg-yellow-100 text-yellow-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {room.is_smoking ? "Cho phép" : "Không cho phép"}
      </span>
    ),
  },
];


export const buttonAction = [
  {
    path: (room) => `/rooms/edit/${room.id}`,
    icon: <FaEdit className="text-white text-xl" />,
    className: "mr-[5px] bg-[#536485] hover:bg-[#39455c]",
    method: "update",
    onClick: (id, openSheet) => {
      if (openSheet) openSheet({ open: true, action: "update", id });
    },
  },
  {
    path: (room) => `/rooms/delete/${room.id}`,
    icon: <MdDeleteForever className="text-white text-xl" />,
    className: "mr-[5px] bg-[#ec4758] hover:bg-[#d03f4d]",
    method: "delete",
    onClick: (id, openDialog) => {
      if (openDialog) openDialog(id); // Mở dialog xác nhận
    },
  },
  {
    path: (room) => `/room-images/${room.id}`,
    icon: <FaRegImages className="text-white text-xl" />,
    className: "mr-[5px] bg-[#111C43] hover:bg-[#0b1331]",
    method: "viewImages",
  },
];

export const breadcrumb = {
  index: {
    title: "Quản lý phòng",
    to: "/room/index",
  },
  create: {
    title: "Thêm mới phòng",
    to: "/room/create",
  },
  edit: {
    title: "Chỉnh sửa phòng",
    to: "/room/edit",
  },
  update: {
    title: "Cập nhật thông tin phòng",
  },
  images: {
    title: "Ảnh phòng",
    to: "room-images/:roomId", // Correct path under "Quản lý phòng"
    parent: {
      title: "Quản lý phòng",
      to: "/room/index",
    },
  },
};
