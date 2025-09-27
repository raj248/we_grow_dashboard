import type { TopupOptions } from "@/types/entities";

import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TopupOptions>[] = [
  {
    accessorKey: "originalPrice",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("originalPrice");
      return `₹${price}`;
    },
  },
  {
    accessorKey: "id",
    header: "Google Product ID",
  },
  {
    accessorKey: "coins",
    header: "Coins",
  },
  {
    accessorKey: "isActive",
    header: "Active",
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
