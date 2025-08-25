import { useQuery } from "@tanstack/react-query";
import {
  getAllTransactions,
  getTransactionById,
  getTransactionsByUserId,
} from "@/services/transactionApi";
import type { Transaction } from "@/types/entities";
import type { APIResponse } from "@/types/api";

// 🔹 Get all transactions
export const useTransactions = () =>
  useQuery<APIResponse<Transaction[]>>({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });

// 🔹 Get one transaction
export const useTransaction = (id: string) =>
  useQuery<APIResponse<Transaction>>({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionById(id),
    enabled: !!id,
  });

// 🔹 Get transactions by user ID
export const useTransactionsByUserId = (userId: string) =>
  useQuery<APIResponse<Transaction[]>>({
    queryKey: ["transactions", "user", userId],
    queryFn: () => getTransactionsByUserId(userId),
    enabled: !!userId,
  });
