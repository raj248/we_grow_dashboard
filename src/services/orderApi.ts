import axios from "axios";
import type { Order } from "@/types/entities";
import type { APIResponse } from "@/types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ✅ GET all orders
export const getAllOrders = async (): Promise<APIResponse<Order[]>> => {
  const res = await axios.get<APIResponse<Order[]>>(`${API_URL}/order`);
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
