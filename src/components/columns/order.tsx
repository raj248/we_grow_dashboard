import type { Order } from "@/types/entities";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "planId",
    header: "Plan Type",
    cell: ({ row }) => {
      return row.original.boostPlan?.title
        ? row.original.boostPlan?.title
        : "N/A";
    },
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const order = row.original as Order;
      const completed = order.completedCount;
      const total = order.boostPlan?.views ?? 0;

      return (
        <span>
          {completed} / {total}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "viewCount",
    header: "View Count",
  },
  {
    accessorKey: "completedViewCount",
    header: "Completed View Count",
    cell: ({ row }) => {
      const completedCount = row.getValue("completedViewCount");
      return `${completedCount ? completedCount : "Not Completed"}`;
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
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      return date.toLocaleString();
    },
  },
];
