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

// POST create a new topup option
export const createTopupOption = async (
  topupOption: Omit<TopupOptions, "createdAt" | "updatedAt">
): Promise<APIResponse<TopupOptions>> => {
  const res = await axios.post<APIResponse<TopupOptions>>(
    `${API_URL}/topup-options`,
    topupOption
  );
  return res.data;
};

// PUT update an existing topup option
export const updateTopupOption = async (
  id: string,
  topupOption: Partial<Omit<TopupOptions, "id" | "createdAt" | "updatedAt">>
): Promise<APIResponse<TopupOptions>> => {
  console.log(id, topupOption);
  const res = await axios.put<APIResponse<TopupOptions>>(
    `${API_URL}/topup-options/${id}`,
    topupOption
  );
  return res.data;
};

// DELETE a topup option
export const deleteTopupOption = async (
  id: string
): Promise<APIResponse<null>> => {
  const res = await axios.delete<APIResponse<null>>(
    `${API_URL}/topup-options/${id}`
  );
  return res.data;
};
