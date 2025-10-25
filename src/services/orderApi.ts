import axios from "axios";
import type { Order } from "@/types/entities";
import type { APIResponse } from "@/types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ✅ GET all orders
export const getAllOrders = async (): Promise<APIResponse<Order[]>> => {
  const res = await axios.get<APIResponse<Order[]>>(`${API_URL}/order`, {
    withCredentials: true,
  });
  return res.data; // keep success + error + data
};

// GET by User Id
export const getOrdersByUserId = async (
  userId: string
): Promise<APIResponse<Order[]>> => {
  const res = await axios.get<APIResponse<Order[]>>(
    `${API_URL}/order/user/${userId}`
  );
  return res.data;
};

// ✅ GET order by id
export const getOrderById = async (id: string): Promise<APIResponse<Order>> => {
  const res = await axios.get<APIResponse<Order>>(`${API_URL}/order/${id}`);
  return res.data;
};

// ✅ Update order status
export const updateOrderStatus = async (
  id: string,
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED"
): Promise<APIResponse<Order>> => {
  const res = await axios.patch<APIResponse<Order>>(
    `${API_URL}/order/${id}/status`,
    { status },
    { withCredentials: true }
  );
  return res.data;
};

// update order progress view count
export const updateOrderProgressViewCount = async (
  id: string,
  progressViewCount: number
): Promise<APIResponse<Order>> => {
  const res = await axios.patch<APIResponse<Order>>(
    `${API_URL}/order/${id}/progress-view-count`,
    { progressViewCount }
  );
  return res.data;
};

// update order progress like count
export const updateOrderProgressLikeCount = async (
  id: string,
  progressLikeCount: number
): Promise<APIResponse<Order>> => {
  const res = await axios.patch<APIResponse<Order>>(
    `${API_URL}/order/${id}/progress-like-count`,
    { progressLikeCount }
  );
  return res.data;
};

// update order progress subscriber count
export const updateOrderProgressSubscriberCount = async (
  id: string,
  progressSubscriberCount: number
): Promise<APIResponse<Order>> => {
  const res = await axios.patch<APIResponse<Order>>(
    `${API_URL}/order/${id}/progress-subscriber-count`,
    { progressSubscriberCount }
  );
  return res.data;
};

// update order final view count
export const updateOrderFinalViewCount = async (
  id: string,
  finalViewCount: number
): Promise<APIResponse<Order>> => {
  const res = await axios.patch<APIResponse<Order>>(
    `${API_URL}/order/${id}/final-view-count`,
    { finalViewCount }
  );
  return res.data;
};

// update order final like count
export const updateOrderFinalLikeCount = async (
  id: string,
  finalLikeCount: number
): Promise<APIResponse<Order>> => {
  const res = await axios.patch<APIResponse<Order>>(
    `${API_URL}/order/${id}/final-like-count`,
    { finalLikeCount }
  );
  return res.data;
};

// update order final subscriber count
export const updateOrderFinalSubscriberCount = async (
  id: string,
  finalSubscriberCount: number
): Promise<APIResponse<Order>> => {
  const res = await axios.patch<APIResponse<Order>>(
    `${API_URL}/order/${id}/final-subscriber-count`,
    { finalSubscriberCount }
  );
  return res.data;
};

// delte order
export const deleteOrder = async (id: string): Promise<APIResponse<Order>> => {
  const res = await axios.delete<APIResponse<Order>>(`${API_URL}/order/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

// refresh all orders
export const refreshAllOrders = async (): Promise<APIResponse<null>> => {
  const res = await axios.post<APIResponse<null>>(
    `${API_URL}/run-worker-now`,
    {},
    { withCredentials: true }
  );
  return res.data;
};
