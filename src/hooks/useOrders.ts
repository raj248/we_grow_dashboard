import { useQuery } from "@tanstack/react-query";

import {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
} from "@/services/orderApi";

import type { Order } from "@/types/entities";
import type { APIResponse } from "@/types/api";

// 🔹 Get all orders
export const useOrders = () =>
  useQuery<APIResponse<Order[]>>({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

// 🔹 Get one order
export const useOrder = (id: string) =>
  useQuery<APIResponse<Order>>({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });

// 🔹 Get orders by user ID
export const useOrdersByUserId = (userId: string) =>
  useQuery<APIResponse<Order[]>>({
    queryKey: ["orders", "user", userId],
    queryFn: () => getOrdersByUserId(userId),
    enabled: !!userId,
  });

// update order status
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateOrderFinalLikeCount,
  updateOrderFinalSubscriberCount,
  updateOrderFinalViewCount,
  updateOrderProgressLikeCount,
  updateOrderProgressSubscriberCount,
  updateOrderProgressViewCount,
  updateOrderStatus,
} from "@/services/orderApi";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<Order>,
    Error,
    { id: string; status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED" }
  >({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["orders", "user"] });
    },
  });
};

// update order progress view count
export const useUpdateOrderProgressViewCount = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<Order>,
    Error,
    { id: string; progressViewCount: number }
  >({
    mutationFn: ({ id, progressViewCount }) =>
      updateOrderProgressViewCount(id, progressViewCount),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["orders", "user"] });
    },
  });
};

// update order progress like count
export const useUpdateOrderProgressLikeCount = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<Order>,
    Error,
    { id: string; progressLikeCount: number }
  >({
    mutationFn: ({ id, progressLikeCount }) =>
      updateOrderProgressLikeCount(id, progressLikeCount),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["orders", "user"] });
    },
  });
};

// update order progress subscriber count
export const useUpdateOrderProgressSubscriberCount = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<Order>,
    Error,
    { id: string; progressSubscriberCount: number }
  >({
    mutationFn: ({ id, progressSubscriberCount }) =>
      updateOrderProgressSubscriberCount(id, progressSubscriberCount),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["orders", "user"] });
    },
  });
};

// update order final view count
export const useUpdateOrderFinalViewCount = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<Order>,
    Error,
    { id: string; finalViewCount: number }
  >({
    mutationFn: ({ id, finalViewCount }) =>
      updateOrderFinalViewCount(id, finalViewCount),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["orders", "user"] });
    },
  });
};

// update order final like count
export const useUpdateOrderFinalLikeCount = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<Order>,
    Error,
    { id: string; finalLikeCount: number }
  >({
    mutationFn: ({ id, finalLikeCount }) =>
      updateOrderFinalLikeCount(id, finalLikeCount),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["orders", "user"] });
    },
  });
};

// update order final subscriber count
export const useUpdateOrderFinalSubscriberCount = () => {
  const queryClient = useQueryClient();
  return useMutation<
    APIResponse<Order>,
    Error,
    { id: string; finalSubscriberCount: number }
  >({
    mutationFn: ({ id, finalSubscriberCount }) =>
      updateOrderFinalSubscriberCount(id, finalSubscriberCount),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["orders", "user"] });
    },
  });
};

import { deleteOrder } from "@/services/orderApi";

// delete order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation<APIResponse<Order>, Error, string>({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "user"] });
    },
  });
};
