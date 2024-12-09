import apiClient from "./apiClient";
import { message } from "antd";

// URL Endpoints
const ENDPOINTS = {
  BOOKINGS: "/admin/bookings",
};

// Utility function for error handling
const handleApiError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  message.error(errorMessage);
  throw error;
};

// Utility function for showing success messages
const showSuccessMessage = (messageText) => {
  if (messageText) message.success(messageText);
};

// API methods for bookings
const bookingApi = {
  getBookings: async (query = "") => {
    try {
      // Gọi API không sử dụng `page` và `limit`
      const response = await apiClient.get(`${ENDPOINTS.BOOKINGS}${query}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy danh sách booking!");
    }
  },
  

  getBookingById: async (bookingId) => {
    try {
      const response = await apiClient.get(`${ENDPOINTS.BOOKINGS}/${bookingId}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy thông tin booking!");
    }
  },
  getBookingDetails: async (bookingId) => {
  
    
    try {
      const response = await apiClient.get(`${ENDPOINTS.BOOKINGS}/${bookingId}`);
      // console.log(response.data.data);
      return response.data.data;
      
    } catch (error) {
      handleApiError(error, "Không thể lấy chi tiết booking!");
    }
  },

  createBooking: async (data) => {
    try {
      const response = await apiClient.post(ENDPOINTS.BOOKINGS, data, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Tạo booking thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi tạo booking!");
    }
  },

  updateBookingStatus: async (bookingId, payload) => {
    try {
      const response = await apiClient.patch(
        `${ENDPOINTS.BOOKINGS}/${bookingId}/status`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      showSuccessMessage("Trạng thái booking được cập nhật thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Không thể cập nhật trạng thái booking!");
    }
  },

 
};

export { bookingApi };
