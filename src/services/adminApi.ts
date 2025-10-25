import axios from "axios";
import type { Admin } from "@/types/entities";
import type { APIResponse } from "@/types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ---------------- Admin Auth ------------------
export const loginAdmin = async (
  username: string,
  password: string
): Promise<APIResponse<Admin>> => {
  const res = await axios.post<APIResponse<Admin>>(
    `${API_URL}/admin/login`,
    {
      username,
      password,
    },
    { withCredentials: true }
  );
  return res.data;
};

export const checkAdminSession = async (): Promise<
  APIResponse<{ isAdmin: boolean }>
> => {
  const res = await axios.get<APIResponse<{ isAdmin: boolean }>>(
    `${API_URL}/admin/check`,
    { withCredentials: true }
  );
  return res.data;
};

export const logoutAdmin = async (): Promise<APIResponse<null>> => {
  const res = await axios.post<APIResponse<null>>(
    `${API_URL}/admin/logout`,
    {},
    { withCredentials: true }
  );
  return res.data;
};
