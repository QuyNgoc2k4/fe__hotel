
// src/types/User.js
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar_url?: string;
  role: string | { name: string };
  createdAt: string; // Added for creation date
}
