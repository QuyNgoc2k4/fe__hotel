import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaRegImages } from "react-icons/fa";

export const tableColumn = [
  { name: "Tên loại phòng", render: (roomType) => <span>{roomType.name}</span> },
  { name: "Mô tả", render: (roomType) => <span>{roomType.description}</span> },
  
  
];

export const buttonAction = [
  {
    path: (roomType) => `/room/room-types/edit/${roomType.id}`,
    icon: <FaEdit className="text-white text-xl" />,
    className: "mr-[5px] bg-[#536485] hover:bg-[#39455c]",
    method: "update",
    onClick: (id, openSheet) => {
      if (openSheet) openSheet({ open: true, action: "update", id });
    },
  },
  {
    path: (roomType) => `/room/room-types/delete/${roomType.id}`,
    icon: <MdDeleteForever className="text-white text-xl" />,
    className: "mr-[5px] bg-[#ec4758] hover:bg-[#d03f4d]",
    method: "delete",
    onClick: (id, openDialog) => {
      if (openDialog) openDialog(id); // Mở dialog xác nhận
    },
  },
 
];

export const breadcrumb = {
  index: {
    title: "Quản lý loại phòng",
    to: "/room/room-types",
  },
  create: {
    title: "Thêm mới loại phòng",
    to: "/room/room-types/create",
  },
  edit: {
    title: "Chỉnh sửa loại phòng",
    to: "/room/room-types/edit",
  },
  update: {
    title: "Cập nhật thông tin loại phòng",
  }
 
};
