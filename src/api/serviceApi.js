import apiClient from "./apiClient";
import { message } from "antd";

// URL Endpoints
const ENDPOINTS = {
  SERVICES: "/admin/services",
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

// API methods for services
const serviceApi = {
  getServices: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.SERVICES);
      return response.data.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy danh sách dịch vụ!");
    }
  },

  getServiceById: async (serviceId) => {
    try {
      const response = await apiClient.get(`${ENDPOINTS.SERVICES}/${serviceId}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy thông tin dịch vụ!");
    }
  },

  createService: async (data) => {
    try {
      const response = await apiClient.post(ENDPOINTS.SERVICES, data, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Tạo dịch vụ thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi tạo dịch vụ!");
    }
  },
  updateService: async ({ serviceId, data }) => {
    try {
      // Loại bỏ các trường không hợp lệ
      const { id, created_at, updated_at, ...filteredData } = data;
  
      console.log(filteredData); // Kiểm tra dữ liệu trước khi gửi
      
      const response = await apiClient.patch(`${ENDPOINTS.SERVICES}/${serviceId}`, filteredData, {
        headers: { "Content-Type": "application/json" },
      });
  
      showSuccessMessage("Cập nhật dịch vụ thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi cập nhật dịch vụ!");
    }
  },
  

  deleteService: async (serviceId) => {
    try {
      await apiClient.delete(`${ENDPOINTS.SERVICES}/${serviceId}`);
      showSuccessMessage("Xóa dịch vụ thành công!");
    } catch (error) {
      handleApiError(error, "Không thể xóa dịch vụ!");
    }
  },
};

export { serviceApi };
