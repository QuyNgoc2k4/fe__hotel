// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://leovn.asia/api/v1", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để thêm token Authorization vào tất cả các yêu cầu
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage (hoặc một nơi khác nếu bạn quản lý khác)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Thêm token vào header Authorization
    }
    return config; // Trả về config đã được cập nhật
  },
  (error) => {
    return Promise.reject(error); // Xử lý lỗi nếu có
  }
);

export default apiClient;
