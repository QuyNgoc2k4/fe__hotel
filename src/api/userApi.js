import apiClient from "./apiClient";
import { message } from "antd";

// URL Endpoints
const ENDPOINTS = {
  USERS: "/users",
  ME: "/users/me",
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

const userApi = {
  // Get a list of users
  getUsers: (page = 1, limit = 10, queryString = "") =>
    apiClient.get(`/users?page=${page}&limit=${limit}${queryString}`).then((response) => response.data.data),

  getUserById: async (userId) => {
    try {
      const response = await apiClient.get(`${ENDPOINTS.USERS}/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy thông tin người dùng!");
    }
  },

  // Fetch logged-in user information
  getUserInfo: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.ME, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy thông tin người dùng từ token!");
    }
  },

  // Create a new admin
  createUser: async (formData) => {
    try {
      const response = await apiClient.post(`${ENDPOINTS.USERS}/create-admin`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Tạo admin thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi tạo admin!");
    }
  },

  // Create a new customer
  createCustomer: async (formData) => {
    try {
      const response = await apiClient.post(`${ENDPOINTS.USERS}/create-customer`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Tạo khách hàng thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi tạo khách hàng!");
    }
  },

  // Create a new staff
  createStaff: async (formData) => {
    try {
      const response = await apiClient.post(`${ENDPOINTS.USERS}/create-staff`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Tạo nhân viên thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi tạo nhân viên!");
    }
  },

  // Update an admin
  updateUser: async ({ userId, data }) => {
    try {
      const response = await apiClient.patch(`${ENDPOINTS.USERS}/update-admin/${userId}`, data, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Cập nhật admin thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi cập nhật admin!");
    }
  },

  // Update a customer
  updateCustomer: async ({ userId, data }) => {
    try {
      const response = await apiClient.patch(`${ENDPOINTS.USERS}/update-customer/${userId}`, data, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Cập nhật khách hàng thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi cập nhật khách hàng!");
    }
  },

  // Update a staff
  updateStaff: async ({ userId, data }) => {
    try {
      const response = await apiClient.patch(`${ENDPOINTS.USERS}/update-staff/${userId}`, data, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Cập nhật nhân viên thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi cập nhật nhân viên!");
    }
  },

  // Search users
  searchUsers: async (queryString) => {
    try {
      const response = await apiClient.get(`${ENDPOINTS.USERS}/search?${queryString}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error, "Không thể tìm kiếm người dùng!");
    }
  },

  // Delete a user
  deleteUser: async (userId) => {
    try {
      const response = await apiClient.delete(`${ENDPOINTS.USERS}/${userId}`);
      showSuccessMessage("Xóa người dùng thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi xóa người dùng!");
    }
  },
};

export { userApi };
