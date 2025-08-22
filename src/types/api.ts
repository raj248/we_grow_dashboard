// src/types/api.ts

export interface APIResponse<T> {
  success: boolean;
  data: T;
  error: string;
}
