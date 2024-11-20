import apiClient from "./apiClient";
import { message } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const hotelApi = {
  getHotels: (page = 1, limit = 10) =>
    apiClient.get(`/hotels?page=${page}&limit=${limit}`).then((response) => response.data.data),




  getHotelById: async (hotelId) => {
    try {
      const response = await apiClient.get(`/hotels/${hotelId}`);
      if (!response.data || typeof response.data.stars === "undefined") {
        throw new Error("Dữ liệu khách sạn không hợp lệ hoặc thiếu 'stars'.");
      }
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Không thể lấy thông tin khách sạn!";
      message.error(errorMessage);
      throw error;
    }
  },
  

  createHotel: async (data: Record<string, any>) => {
    try {
      const parsedData = {
        ...data,
        stars: parseInt(data.stars, 10),
        total_rooms: parseInt(data.total_rooms, 10),
        rating: parseFloat(data.rating),
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
      };

      const response = await apiClient.post("/hotels", parsedData, {
        headers: { "Content-Type": "application/json" },
      });

      message.success("Tạo khách sạn thành công!");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Lỗi khi tạo khách sạn!";
      message.error(errorMessage);
      throw error;
    }
  },

  updateHotel: async ({ hotelId, data }: { hotelId: string; data: Record<string, any> }) => {
    try {
      const parsedData = {
        ...data,
        stars: parseInt(data.stars || "0", 10),
        total_rooms: parseInt(data.total_rooms || "0", 10),
        rating: parseFloat(data.rating || "0"),
        latitude: parseFloat(data.latitude || "0"),
        longitude: parseFloat(data.longitude || "0"),
      };
  
      console.log("Hotel ID:", hotelId);
      console.log("Dữ liệu gửi đến API PATCH:", parsedData);
      Object.keys(parsedData).forEach((key) => {
        console.log(`  ${key}: ${typeof parsedData[key]}`, parsedData[key]);
      });
  
      const response = await apiClient.patch(`/hotels/${hotelId}`, parsedData, {
        headers: { "Content-Type": "application/json" },
      });
  
      message.success("Cập nhật khách sạn thành công!");
      return response.data;
    } catch (error) {
      console.error("Chi tiết lỗi từ máy chủ:", error.response?.data);
      const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật khách sạn!";
      message.error(errorMessage);
      throw error;
    }
  },



  // Xóa khách sạn
  deleteHotel: async (hotelId) => {
    try {
      await apiClient.delete(`/hotels/${hotelId}`);
      message.success("Xóa khách sạn thành công!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Không thể xóa khách sạn!";
      message.error(errorMessage);
      throw error;
    }
  },
};

// Cấu hình bảng danh sách khách sạn
const tableColumn = [
  { name: "Tên khách sạn", render: (hotel) => <span>{hotel.name}</span> },
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
const buttonAction = [
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
const breadcrumb = {
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

// Xuất tất cả
export { hotelApi, tableColumn, buttonAction, breadcrumb };
