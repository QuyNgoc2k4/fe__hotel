// src/api/authApi.js
import apiClient from "./apiClient";

const authApi = {
  login: (data) => apiClient.post("/auth/login", data),
  loginWithGoogle: (data) => apiClient.post("/auth/google-login", data),

  forgotPassword: (email) => apiClient.post("/auth/forgot-password", { email }),
  verifyOtp: (data) => apiClient.post("/auth/verify-forgot-password-otp", data), // { email, otp }
  resetPassword: (data) => apiClient.post("/auth/reset-password", data), // { resetToken, newPassword }
};

export default authApi;
