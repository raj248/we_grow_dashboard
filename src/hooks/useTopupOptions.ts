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

// update topup option
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTopupOption,
  updateTopupOption,
  deleteTopupOption,
} from "@/services/topupApi";

export const useCreateTopupOption = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<TopupOptions>,
    Error,
    Omit<TopupOptions, "createdAt" | "updatedAt">
  >({
    mutationFn: createTopupOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topup-options"] });
    },
  });
};

export const useUpdateTopupOption = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<TopupOptions>,
    Error,
    {
      id: string;
      topupOption: Partial<
        Omit<TopupOptions, "id" | "createdAt" | "updatedAt">
      >;
    }
  >({
    mutationFn: ({ id, topupOption }) => updateTopupOption(id, topupOption),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["topup-options"] });
      queryClient.invalidateQueries({
        queryKey: ["topup-option", variables.id],
      });
    },
  });
};

// delete topup option
export const useDeleteTopupOption = () => {
  const queryClient = useQueryClient();
  return useMutation<APIResponse<null>, Error, string>({
    mutationFn: deleteTopupOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topup-options"] });
    },
  });
};
