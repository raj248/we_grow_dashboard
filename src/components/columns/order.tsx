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
      const total =
        order.boostPlan?.views ||
        order.boostPlan?.likes ||
        order.boostPlan?.subscribers;

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
    header: "Views",
  },
  {
    accessorKey: "likeCount",
    header: "Likes",
  },
  {
    accessorKey: "subscriberCount",
    header: "Subscribers",
  },
  {
    accessorKey: "completedViewCount",
    header: "View at Completion",
    cell: ({ row }) => {
      const completedCount = row.getValue("completedViewCount");
      return `${completedCount ? completedCount : "--"}`;
    },
  },
  {
    accessorKey: "completedLikeCount",
    header: "Like at Completion",
    cell: ({ row }) => {
      const completedCount = row.getValue("completedLikeCount");
      return `${completedCount ? completedCount : "--"}`;
    },
  },
  {
    accessorKey: "completedSubscriberCount",
    header: "Subscriber at Completion",
    cell: ({ row }) => {
      const completedCount = row.getValue("completedSubscriberCount");
      return `${completedCount ? completedCount : "--"}`;
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
