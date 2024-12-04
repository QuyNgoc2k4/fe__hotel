import apiClient from "./apiClient";
import { message } from "antd";
// URL Endpoints
const ENDPOINTS = {
  ROOMTYPES: "/room-types",
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
const parseData = (data) => ({
  ...data
});
// API methods
const roomTypeApi = {
  getRoomTypes: async (page = 1, limit = 10, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      }).toString();
      const response = await apiClient.get(
        `${ENDPOINTS.ROOMTYPES}?${queryParams}`
      );
      return response.data.data;
    } catch (error) {
      handleApiError(error, "Cannot fetch room types list!");
    }
  },
  getRoomTypeById: async (roomTypeId) => {
    try {
      const response = await apiClient.get(
        `${ENDPOINTS.ROOMTYPES}/${roomTypeId}`
      );
      if (!response.data) {
        throw new Error("Invalid room type data.");
      }
      return response.data;
    } catch (error) {
      handleApiError(error, "Cannot fetch room type information!");
    }
  },
  createRoomType: async (data) => {
    try {
      const response = await apiClient.post(
        ENDPOINTS.ROOMTYPES,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      showSuccessMessage("Room type created successfully!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Error creating room type!");
    }
  },
  updateRoomType: async ({ roomTypeId, data }) => {
    try {
      const { id, ...parsedData } = parseData(data);
      const response = await apiClient.patch(
        `${ENDPOINTS.ROOMTYPES}/${roomTypeId}`,
        parsedData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
      showSuccessMessage("Room type updated successfully!");
    } catch (error) {
      handleApiError(error, "Error updating room type!");
    }
  },
  deleteRoomType: async (roomTypeId) => {
    try {
      await apiClient.delete(`${ENDPOINTS.ROOMTYPES}/${roomTypeId}`);
      showSuccessMessage("Room type deleted successfully!");
    } catch (error) {
      handleApiError(error, "Cannot delete room type!");
    }
  },
};
export { roomTypeApi };
