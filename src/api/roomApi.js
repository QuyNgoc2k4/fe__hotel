import apiClient from "./apiClient";
import { message } from "antd";

const ENDPOINTS = {
  ROOMS: "/rooms",
  ROOM_IMAGES: "/room-images",
};

const handleApiError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || defaultMessage;
  message.error(errorMessage);
  throw error;
};

const showSuccessMessage = (messageText) => {
  if (messageText) message.success(messageText);
};

const parseRoomData = (data) => ({
  ...data,
  price: parseFloat(data.price || "0"),
  max_guests: parseInt(data.max_guests || "0", 10),
});

const roomApi = {
  getRooms: async (hotelId, page = 1, limit = 10) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      }).toString();
      const response = await apiClient.get(`${ENDPOINTS.ROOMS}/hotel/${hotelId}?${queryParams}`);
      return response.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy danh sách phòng!");
    }
  },
  filterRooms: async (filters = {}, page = 1, limit = 10) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      }).toString();
      const response = await apiClient.get(`/rooms/filter/search?${queryParams}`);
      return response.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy danh sách phòng!");
    }
  },
  getRoomById: async (roomId) => {
    try {
      const response = await apiClient.get(`${ENDPOINTS.ROOMS}/${roomId}`);
      if (!response.data) {
        throw new Error("Dữ liệu phòng không hợp lệ.");
      }
      return response.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy thông tin phòng!");
    }
  },

  createRoom: async (data) => {
    try {
      const parsedData = parseRoomData(data);
      const response = await apiClient.post(ENDPOINTS.ROOMS, parsedData, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Tạo phòng thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi tạo phòng!");
    }
  },

  updateRoom: async ({ roomId, data }) => {
    try {
      const { id, ...parsedData } = parseRoomData(data);
      const response = await apiClient.patch(`${ENDPOINTS.ROOMS}/${roomId}`, parsedData, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Cập nhật phòng thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi cập nhật phòng!");
    }
  },

  deleteRoom: async (roomId) => {
    try {
      await apiClient.delete(`${ENDPOINTS.ROOMS}/${roomId}`);
      showSuccessMessage("Xóa phòng thành công!");
    } catch (error) {
      handleApiError(error, "Không thể xóa phòng!");
    }
  },

  getRoomImages: async (roomId, page = 1, limit = 8) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      }).toString();

      const response = await apiClient.get(`${ENDPOINTS.ROOM_IMAGES}/${roomId}?${queryParams}`);
      return response.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy danh sách hình ảnh phòng!");
    }
  },

  deleteRoomImage: async (imageId) => {
    try {
      await apiClient.delete(`${ENDPOINTS.ROOM_IMAGES}/${imageId}`);
      showSuccessMessage("Xóa ảnh phòng thành công!");
    } catch (error) {
      handleApiError(error, "Không thể xóa ảnh phòng!");
    }
  },

  uploadRoomImages: async (data) => {
    try {
      const response = await apiClient.post(ENDPOINTS.ROOM_IMAGES, data, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Upload ảnh phòng thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Không thể upload ảnh phòng!");
    }
  },
};

export { roomApi };
