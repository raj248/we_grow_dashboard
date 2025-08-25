import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createBoostPlan,
  deleteBoostPlan,
  getAllBoostPlans,
  getBoostPlanById,
  updateBoostPlan,
} from "@/services/boostplanApi";
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

// 🔹 Create a boost plan
export const useCreateBoostPlan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<BoostPlan>,
    Error,
    Omit<BoostPlan, "id" | "createdAt" | "updatedAt" | "orders">
  >({
    mutationFn: createBoostPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boost-plans"] });
    },
  });
};

// 🔹 Update a boost plan
export const useUpdateBoostPlan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<BoostPlan>,
    Error,
    {
      id: string;
      boostPlan: Partial<
        Omit<BoostPlan, "id" | "createdAt" | "updatedAt" | "orders">
      >;
    }
  >({
    mutationFn: ({ id, boostPlan }) => updateBoostPlan(id, boostPlan),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["boost-plans"] });
      queryClient.invalidateQueries({ queryKey: ["boost-plan", variables.id] });
    },
  });
};

// 🔹 Delete a boost plan
export const useDeleteBoostPlan = () => {
  const queryClient = useQueryClient();
  return useMutation<APIResponse<null>, Error, string>({
    mutationFn: deleteBoostPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boost-plans"] });
    },
  });
};
