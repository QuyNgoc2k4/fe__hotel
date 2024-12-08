import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaRegImages } from "react-icons/fa";
import { BsBuildingFillAdd } from "react-icons/bs";
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
        {room.status ? "Phòng đã được đặt" : "Phòng trống"}
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
    icon: <BsBuildingFillAdd className="text-white text-xl" />,
    className: "mr-[5px] bg-[#536485] hover:bg-[#39455c]",

    onClick: (id, openSheet) => {
      console.log("Room ID:", id); // Log the room ID to the console
      if (openSheet) openSheet({ open: true, id });
    },
  }
];

export const breadcrumb = {
  index: {
    title: "Danh sách phòng trống",
    to: "/room-available",
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
