import { Eye, ThumbsUp, UserPlus } from "lucide-react";
import type { Order } from "@/types/entities";
import type { ColumnDef } from "@tanstack/react-table";
import { detectYouTubeLinkType } from "@/utils/youtube-link-identifier";

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
      return row.original.boostPlan?.title ?? "N/A";
    },
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      const url = row.getValue("url") as string;
      const type = detectYouTubeLinkType(url);

      let displayText = "";
      switch (type) {
        case "video":
          displayText = "Watch Video";
          break;
        case "shorts":
          displayText = "Watch Shorts";
          break;
        case "channel":
          displayText = "Visit Channel";
          break;
        default:
          displayText = "Open Link";
      }

      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3b82f6", textDecoration: "underline" }}
        >
          {displayText}
        </a>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const order = row.original;
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
    id: "stats",
    header: "Stats",
    cell: ({ row }) => {
      const o = row.original;
      const completedViewCount =
        Number(row.getValue("completedViewCount")) || o.viewCount || 0;
      const completedLikeCount =
        Number(row.getValue("completedLikeCount")) || o.likeCount || 0;
      const completedSubscriberCount =
        Number(row.getValue("completedSubscriberCount")) ||
        o.subscriberCount ||
        0;

      const diffViews = (completedViewCount ?? 0) - (o.viewCount ?? 0);
      const diffLikes = (completedLikeCount ?? 0) - (o.likeCount ?? 0);
      const diffSubs =
        (completedSubscriberCount ?? 0) - (o.subscriberCount ?? 0);

      const StatItem = ({
        icon: Icon,
        label,
        start,
        end,
        diff,
      }: {
        icon: any;
        label: string;
        start: number;
        end: number;
        diff: number;
      }) => (
        <div className="flex items-center gap-2 text-sm">
          <Icon className="w-4 h-4 text-emerald-500" />
          <span className="font-medium">{label}:</span>
          <span>
            {start} → {end}{" "}
            <span
              className={`ml-1 ${
                diff > 0
                  ? "text-emerald-500"
                  : diff < 0
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              ({diff >= 0 ? "+" : ""}
              {diff})
            </span>
          </span>
        </div>
      );

      return (
        <div className="flex flex-col gap-1">
          <StatItem
            icon={Eye}
            label="Views"
            start={o.viewCount ?? 0}
            end={completedViewCount ?? 0}
            diff={diffViews}
          />
          <StatItem
            icon={ThumbsUp}
            label="Likes"
            start={o.likeCount ?? 0}
            end={completedLikeCount ?? 0}
            diff={diffLikes}
          />
          <StatItem
            icon={UserPlus}
            label="Subs"
            start={o.subscriberCount ?? 0}
            end={completedSubscriberCount ?? 0}
            diff={diffSubs}
          />
        </div>
      );
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
