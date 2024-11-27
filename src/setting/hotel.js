import { hotelApi } from "../api/hotelApi";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaRegImages } from "react-icons/fa";

export const tableColumn = [
  { name: "Tên khách sạn", render: (hotel) => <span>{hotel.name}</span> },
  { name: "Avatar", render: (hotel) =>  hotel.avatar_url ? ( <img src={hotel.avatar_url} alt="Avatar" className="w-10 h-10" /> ): 
      (
        <div className="w-10 h-10  bg-gray-300 flex items-center justify-center">N/A</div>
      ),
  },
  { name: "Địa chỉ", render: (hotel) => <span>{hotel.address}</span> },
  { name: "Thành phố", render: (hotel) => <span>{hotel.city}</span> },
  { name: "Điện thoại", render: (hotel) => <span>{hotel.phone}</span> },
  { name: "Email", render: (hotel) => <span>{hotel.email}</span> },
  { name: "Số sao", render: (hotel) => <span>{hotel.stars}</span> },
  { name: "Mô tả", render: (hotel) => <span>{hotel.description}</span> },
  { name: "Số phòng", render: (hotel) => <span>{hotel.total_rooms}</span> },
  { name: "Loại hình", render: (hotel) => <span>{hotel.hotel_type}</span> },
];

export const buttonAction = [
  {
    path: (hotel) => `/hotels/edit/${hotel.id}`,
    icon: <FaEdit className="text-white text-xl" />,
    className: "mr-[5px] bg-[#536485] hover:bg-[#39455c]",
    method: "update",
    onClick: (id, openSheet) => {
      if (openSheet) openSheet({ open: true, action: "update", id });
    },
  },
  {
    path: (hotel) => `/hotels/delete/${hotel.id}`,
    icon: <MdDeleteForever className="text-white text-xl" />,
    className: "mr-[5px] bg-[#ec4758] hover:bg-[#d03f4d]",
    method: "delete",
    onClick: (id, openDialog) => {
      if (openDialog) openDialog(id); // Mở dialog xác nhận
    },
  },
  {
    path: (hotel) => `/hotel-images/${hotel.id}`,
    icon: <FaRegImages className="text-white text-xl" />,
    className: "mr-[5px] bg-[#111C43] hover:bg-[#0b1331]",
    method: "viewImages",
    
  },
];

 // Breadcrumb
 export const breadcrumb = {
    index: {
      title: "Quản lý khách sạn",
      to: "/hotels/index",
    },
    create: {
      title: "Thêm mới khách sạn",
      to: "/hotels/create",
    },
    edit: {
      title: "Chỉnh sửa khách sạn",
      to: "/hotels/edit",
    },
    update: {
      title: "Cập nhật thông tin khách sạn",
    },
    images: {
      title: "Ảnh khách sạn",
      to: "hotel-images/:hotelId",
    },
  };