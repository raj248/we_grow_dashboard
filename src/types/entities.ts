export interface User {
  id: string;
  userId: string;
  fcmToken?: string | null;
  lastActiveAt: string; // ISO string from API
  createdAt: string;
  updatedAt: string;

  // Relations (optional — depending on what your API sends back)
  wallet?: Wallet | null;
  orders?: Order[];
  transactions?: Transaction[];
  watchHistory?: WatchHistory[];
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  updatedAt: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "CREDIT" | "DEBIT";
  amount: number;
  source: string;
  transactionId: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  planId: string;
  url: string;
  viewCount: number;
  completedCount: number;
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;

  boostPlan?: BoostPlan;
  user?: User;
  watchHistory?: WatchHistory[];
}

export interface BoostPlan {
  id: string;
  title: string;
  description?: string;
  price: number;
  salePrice?: number;
  views: number;
  duration: number;
  reward: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  // 🔹 Relation
  orders?: Order[];
}

export interface WatchHistory {
  id: string;
  userId: string;
  orderId: string;
  watchedAt: string;
}

export interface TopupOptions {
  id: string;
  coins: number;
  originalPrice: number;
  isActive: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
