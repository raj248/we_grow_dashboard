import { useQuery } from "@tanstack/react-query";

import { getAllBoostPlans, getBoostPlanById } from "@/services/boostplanApi";
import type { BoostPlan } from "@/types/entities";
import type { APIResponse } from "@/types/api";

// 🔹 Get all boost plans
export const useBoostPlans = () =>
  useQuery<APIResponse<BoostPlan[]>>({
    queryKey: ["boost-plans"],
    queryFn: getAllBoostPlans,
  });

// 🔹 Get one boost plan
export const useBoostPlan = (id: string) =>
  useQuery<APIResponse<BoostPlan>>({
    queryKey: ["boost-plan", id],
    queryFn: () => getBoostPlanById(id),
    enabled: !!id,
  });
