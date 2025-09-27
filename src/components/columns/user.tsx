import type { User } from "@/types/entities";

import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "lastActiveAt",
    header: "Last Active",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastActiveAt"));
      return date.toLocaleString();
    },
  },
  {
    accessorFn: (row) => row.wallet?.balance,
    id: "walletBalance",
    header: "Wallet Balance",
    cell: ({ row }) => {
      const balance = row.original.wallet?.balance;
      return balance != null ? `${balance}` : "N/A";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleString();
    },
  },
];
