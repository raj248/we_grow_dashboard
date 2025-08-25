import axios from "axios";
import type { Transaction } from "@/types/entities";
import type { APIResponse } from "@/types/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ✅ GET all transactions
export const getAllTransactions = async (): Promise<
  APIResponse<Transaction[]>
> => {
  const res = await axios.get<APIResponse<Transaction[]>>(
    `${API_URL}/transactions`
  );
  return res.data;
};

// ✅ GET transaction by id
export const getTransactionById = async (
  id: string
): Promise<APIResponse<Transaction>> => {
  const res = await axios.get<APIResponse<Transaction>>(
    `${API_URL}/transactions/${id}`
  );
  return res.data;
};

// GET transaction by userId
export const getTransactionsByUserId = async (
  userId: string
): Promise<APIResponse<Transaction[]>> => {
  const res = await axios.get<APIResponse<Transaction[]>>(
    `${API_URL}/transactions/user/${userId}`
  );
  return res.data;
};
