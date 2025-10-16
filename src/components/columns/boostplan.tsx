import type { BoostPlan } from "@/types/entities";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<BoostPlan>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description");
      if (!description) return "N/A";
      return (description as string).length > 50
        ? (description as string).substring(0, 50) + "..."
        : description;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price");
      return `${price}`;
    },
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "likes",
    header: "Likes",
  },
  {
    accessorKey: "subscribers",
    header: "Subscribers",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "reward",
    header: "Reward",
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
