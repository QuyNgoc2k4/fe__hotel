// src/api/userApi.js
import apiClient from "./apiClient";

const userApi = {
  getUsers: () => apiClient.get("/users"),
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
};

export default userApi;
