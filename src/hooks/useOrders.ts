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
