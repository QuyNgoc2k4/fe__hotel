import apiClient from "./apiClient";

const authApi = {
  login: (data) => apiClient.post("/auth/login", data),
  loginWithGoogle: (data) => apiClient.post("/auth/google-login", data), // Send idToken to backend
};

export default authApi;
