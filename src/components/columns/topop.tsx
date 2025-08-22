import type { TopupOptions } from "@/types/entities";

import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TopupOptions>[] = [
  //   {
  //     accessorKey: "price",
  //     header: "Price",
  //     cell: ({ row }) => {
  //       const price = row.getValue("price");
  //       return `$${price}`;
  //     },
  //   },
  {
    accessorKey: "coins",
    header: "Coins",
  },
  {
    accessorKey: "googleProductId",
    header: "Google Product ID",
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
