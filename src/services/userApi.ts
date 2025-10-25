import axios from "axios";
import type { User } from "@/types/entities";
import type { APIResponse } from "@/types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ✅ GET all users
export const getAllUsers = async (): Promise<APIResponse<User[]>> => {
  const res = await axios.get<APIResponse<User[]>>(`${API_URL}/user`);
  return res.data; // keep success + error + data
};

// ✅ GET user by id
export const getUserById = async (id: string): Promise<APIResponse<User>> => {
  const res = await axios.get<APIResponse<User>>(`${API_URL}/user/${id}`);
  return res.data;
};

// ✅ Get active users in last 24 hrs
export const getActiveUsersLast24Hrs = async (): Promise<
  APIResponse<User[]>
> => {
  const res = await axios.get<APIResponse<User[]>>(`${API_URL}/user/active`, {
    withCredentials: true,
  });
  return res.data;
};
