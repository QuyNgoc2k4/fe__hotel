import apiClient from "./apiClient";
import { message } from "antd";

// URL Endpoints
const ENDPOINTS = {
  HOTELS: "/hotels",
  HOTEL_IMAGES: "/hotel-images",
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

// Utility function for parsing data
const parseData = (data) => ({
  ...data,
  stars: parseInt(data.stars || "0", 10),
  total_rooms: parseInt(data.total_rooms || "0", 10),
  rating: parseFloat(data.rating || "0"),
  latitude: parseFloat(data.latitude || "0"),
  longitude: parseFloat(data.longitude || "0"),
});

// API methods
const hotelApi = {
  getHotels: async (page = 1, limit = 10, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      }).toString();

      const response = await apiClient.get(`${ENDPOINTS.HOTELS}?${queryParams}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy danh sách khách sạn!");
    }
  },

  getHotelById: async (hotelId) => {
    try {
      const response = await apiClient.get(`${ENDPOINTS.HOTELS}/${hotelId}`);
      if (!response.data || typeof response.data.stars === "undefined") {
        throw new Error("Dữ liệu khách sạn không hợp lệ hoặc thiếu 'stars'.");
      }
      return response.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy thông tin khách sạn!");
    }
  },

  createHotel: async (data) => {
    try {
      const parsedData = parseData(data);
      const response = await apiClient.post(ENDPOINTS.HOTELS, parsedData, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Tạo khách sạn thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi tạo khách sạn!");
    }
  },

  updateHotel: async ({ hotelId, data }) => {
    try {
      const { id, ...parsedData } = parseData(data);
      const response = await apiClient.patch(`${ENDPOINTS.HOTELS}/${hotelId}`, parsedData, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Cập nhật khách sạn thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi cập nhật khách sạn!");
    }
  },

  deleteHotel: async (hotelId) => {
    try {
      console.log(hotelId);
      
      await apiClient.delete(`${ENDPOINTS.HOTELS}/${hotelId}`);
      showSuccessMessage("Xóa khách sạn thành công!");
    } catch (error) {
      handleApiError(error, "Không thể xóa khách sạn!");
    }
  },

  getHotelImages: async (hotelId, page = 1, limit = 8) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      }).toString();

      const response = await apiClient.get(`${ENDPOINTS.HOTEL_IMAGES}/${hotelId}?${queryParams}`);
      return response.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy danh sách hình ảnh!");
    }
  },

  deleteHotelImage: async (imageId) => {
    try {
      await apiClient.delete(`${ENDPOINTS.HOTEL_IMAGES}/${imageId}`);
      showSuccessMessage("Xóa ảnh thành công!");
    } catch (error) {
      handleApiError(error, "Không thể xóa ảnh!");
    }
  },

  uploadHotelImages: async (data) => {
    try {
      const response = await apiClient.post(ENDPOINTS.HOTEL_IMAGES, data, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Upload ảnh thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Không thể upload ảnh!");
    }
  },
};

export { hotelApi };
