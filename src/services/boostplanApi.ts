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
