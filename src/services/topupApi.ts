import axios from "axios";
import type { TopupOptions } from "@/types/entities";
import type { APIResponse } from "@/types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ✅ GET all topup options
export const getAllTopupOptions = async (): Promise<
  APIResponse<TopupOptions[]>
> => {
  const res = await axios.get<APIResponse<TopupOptions[]>>(
    `${API_URL}/topup-options`
  );
  return res.data;
};

// ✅ GET topup option by id
export const getTopupOptionById = async (
  id: string
): Promise<APIResponse<TopupOptions>> => {
  const res = await axios.get<APIResponse<TopupOptions>>(
    `${API_URL}/topup-options/${id}`
  );
  return res.data;
};
