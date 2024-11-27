import { hotelApi } from "../../../api/hotelApi";

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
// Cấu hình bảng danh sách khách sạn
export const tableColumn = [
    { name: "Tên khách sạn", render: (hotel) => <span>{hotel.name}</span> },
    { name: "Ảnh", render: (hotel) => <span>{hotel.avatar_url}</span> },
    { name: "Địa chỉ", render: (hotel) => <span>{hotel.address}</span> },
    { name: "Thành phố", render: (hotel) => <span>{hotel.city}</span> },
    { name: "Điện thoại", render: (hotel) => <span>{hotel.phone}</span> },
    { name: "Email", render: (hotel) => <span>{hotel.email}</span> },
    { name: "Số sao", render: (hotel) => <span>{hotel.stars}</span> },
    { name: "Mô tả", render: (hotel) => <span>{hotel.description}</span> },
    { name: "Số phòng", render: (hotel) => <span>{hotel.total_rooms}</span> },
    { name: "Loại hình", render: (hotel) => <span>{hotel.hotel_type}</span> },
  ];
  
  // Hành động trên mỗi dòng
  export const buttonAction = [
    {
      path: (hotel) => `/hotels/edit/${hotel.id}`,
      icon: <FaEdit className="text-white text-xl" />,
      className: "mr-[5px] bg-[#536485] hover:bg-[#39455c]",
      method: "update",
      onClick: (id, openSheet) => {
        openSheet({ open: true, action: "update", id });
      },
    },
    {
      path: (hotel) => `/hotels/delete/${hotel.id}`,
      icon: <MdDeleteForever className="text-white text-xl" />,
      className: "mr-[5px] bg-[#ec4758] hover:bg-[#d03f4d]",
      method: "delete",
      onClick: async (id) => {
        try {
          await hotelApi.deleteHotel(id); // Gọi API xóa khách sạn
        } catch (error) {
          // Lỗi đã được xử lý trong API, không cần thêm gì ở đây
        }
      },
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
  };