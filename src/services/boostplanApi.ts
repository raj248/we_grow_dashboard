import axios from "axios";
import type { BoostPlan } from "@/types/entities";
import type { APIResponse } from "@/types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ✅ GET all boost plans
export const getAllBoostPlans = async (): Promise<APIResponse<BoostPlan[]>> => {
  const res = await axios.get<APIResponse<BoostPlan[]>>(
    `${API_URL}/boost-plans`
  );
  return res.data;
};

// ✅ GET boost plan by id
export const getBoostPlanById = async (
  id: string
): Promise<APIResponse<BoostPlan>> => {
  const res = await axios.get<APIResponse<BoostPlan>>(
    `${API_URL}/boost-plans/${id}`
  );
  return res.data;
};

// POST create a new boost plan
export const createBoostPlan = async (
  boostPlan: Omit<BoostPlan, "id" | "createdAt" | "updatedAt" | "orders">
): Promise<APIResponse<BoostPlan>> => {
  const res = await axios.post<APIResponse<BoostPlan>>(
    `${API_URL}/boost-plans`,
    boostPlan
  );
  return res.data;
};

// PUT update an existing boost plan
export const updateBoostPlan = async (
  id: string,
  boostPlan: Partial<
    Omit<BoostPlan, "id" | "createdAt" | "updatedAt" | "orders">
  >
): Promise<APIResponse<BoostPlan>> => {
  const res = await axios.put<APIResponse<BoostPlan>>(
    `${API_URL}/boost-plans/${id}`,
    boostPlan
  );
  return res.data;
};

// DELETE a boost plan
export const deleteBoostPlan = async (
  id: string
): Promise<APIResponse<null>> => {
  const res = await axios.delete<APIResponse<null>>(
    `${API_URL}/boost-plans/${id}`
  );
  return res.data;
};
