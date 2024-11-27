import apiClient from "./apiClient";
import { message } from "antd";

// URL Endpoints
const ENDPOINTS = {
  HOTELS: "/rooms",
  HOTEL_IMAGES: "/room-images",
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
  getRooms: async (page = 1, limit = 10, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      }).toString();

      const response = await apiClient.get(`${ENDPOINTS.ROOMS}?${queryParams}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy danh sách phòng!");
    }
  },

 
};

export { hotelApi };
