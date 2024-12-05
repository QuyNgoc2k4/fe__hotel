import apiClient from "./apiClient";
import { message } from "antd";

// URL Endpoints
const ENDPOINTS = {
  VOUCHERS: "/admin/vouchers",
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

// API methods for vouchers
const voucherApi = {
  getVouchers: async () => {
    try {
      const response = await apiClient.get(ENDPOINTS.VOUCHERS);
      return response.data.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy danh sách voucher!");
    }
  },

  getVoucherById: async (voucherId) => {
    try {
      const response = await apiClient.get(`${ENDPOINTS.VOUCHERS}/${voucherId}`);
      return response.data.data;
    } catch (error) {
      handleApiError(error, "Không thể lấy thông tin voucher!");
    }
  },

  createVoucher: async (data) => {
    try {
      const response = await apiClient.post(ENDPOINTS.VOUCHERS, data, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Tạo voucher thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi tạo voucher!");
    }
  },

  updateVoucher: async ({ voucherId, data }) => {
    try {
      // Loại bỏ các trường không hợp lệ
      const { id, created_at, updated_at, ...filteredData } = data;

      console.log(filteredData); // Kiểm tra dữ liệu trước khi gửi
      
      const response = await apiClient.patch(`${ENDPOINTS.VOUCHERS}/${voucherId}`, filteredData, {
        headers: { "Content-Type": "application/json" },
      });

      showSuccessMessage("Cập nhật voucher thành công!");
      return response.data;
    } catch (error) {
      handleApiError(error, "Lỗi khi cập nhật voucher!");
    }
  },

  deleteVoucher: async (voucherId) => {
    try {
      await apiClient.delete(`${ENDPOINTS.VOUCHERS}/${voucherId}`);
      showSuccessMessage("Xóa voucher thành công!");
    } catch (error) {
      handleApiError(error, "Không thể xóa voucher!");
    }
  },
};

export { voucherApi };
