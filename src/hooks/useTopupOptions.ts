import { useQuery } from "@tanstack/react-query";
import { getAllTopupOptions, getTopupOptionById } from "@/services/topupApi";
import type { TopupOptions } from "@/types/entities";
import type { APIResponse } from "@/types/api";

// 🔹 Get all topup options
export const useTopupOptions = () =>
  useQuery<APIResponse<TopupOptions[]>>({
    queryKey: ["topup-options"],
    queryFn: getAllTopupOptions,
  });

// 🔹 Get one topup option
export const useTopupOption = (id: string) =>
  useQuery<APIResponse<TopupOptions>>({
    queryKey: ["topup-option", id],
    queryFn: () => getTopupOptionById(id),
    enabled: !!id,
  });
