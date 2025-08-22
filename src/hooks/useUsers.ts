import { useQuery } from "@tanstack/react-query";
import {
  getAllUsers,
  getUserById,
  getActiveUsersLast24Hrs,
} from "@/services/userApi";
import type { User } from "@/types/entities";
import type { APIResponse } from "@/types/api";

// 🔹 Get all users
export const useUsers = () =>
  useQuery<APIResponse<User[]>>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

// 🔹 Get one user
export const useUser = (id: string) =>
  useQuery<APIResponse<User>>({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });

// 🔹 Active users in last 24hrs
export const useActiveUsersLast24Hrs = () =>
  useQuery<APIResponse<User[]>>({
    queryKey: ["users", "active"],
    queryFn: getActiveUsersLast24Hrs,
  });
