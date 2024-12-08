import axios from "axios";
import { message } from "antd";

const apiClient = axios.create({
  baseURL: "https://leovn.asia/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Thêm Authorization header nếu có token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Xử lý lỗi xác thực
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      message.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
      localStorage.removeItem("token"); // Xóa token
      window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
    } else if (error.response?.status === 500) {
      localStorage.removeItem("token"); // Xóa token
      window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
    }
    return Promise.reject(error);
  }
);

export default apiClient;
