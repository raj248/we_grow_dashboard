import type { Transaction } from "@/types/entities";
import type { ColumnDef } from "@tanstack/react-table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { UserHoverContent } from "../UserHoverContent";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    // limit the width of this column
    cell: ({ row }) => {
      const transactionId = row.getValue("transactionId");
      return (transactionId as string).length > 80
        ? (transactionId as string).substring(0, 80) + "..."
        : transactionId;
    },
  },
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => {
      const userId = row.getValue("userId") as string;

      return (
        <HoverCard>
          <HoverCardTrigger>
            <span className="text-blue-600 hover:underline cursor-pointer">
              {userId}
            </span>
          </HoverCardTrigger>

          <HoverCardContent className="w-64 p-4 space-y-2">
            <UserHoverContent userId={userId} />
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount");
      return `${amount}`;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "source",
    header: "Source",
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
