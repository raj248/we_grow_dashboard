import { Eye, ThumbsUp, UserPlus } from "lucide-react";
import type { Order } from "@/types/entities";
import type { ColumnDef } from "@tanstack/react-table";
import { detectYouTubeLinkType } from "@/utils/youtube-link-identifier";
import type { JSX } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { UserHoverContent } from "../UserHoverContent";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
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
    accessorKey: "planId",
    header: "Plan Type",
    cell: ({ row }) => row.original.boostPlan?.title ?? "N/A",
    // optional: enable filtering
    filterFn: (row, id, value) => {
      id; // column id
      const planTitle = row.original.boostPlan?.title ?? "";
      console.log(
        planTitle,
        value,
        planTitle.toLowerCase().includes((value as string).toLowerCase())
      );
      return planTitle.toLowerCase().includes((value as string).toLowerCase());
    },
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      const url = row.getValue("url") as string;
      const type = detectYouTubeLinkType(url);
      const displayText =
        type === "video"
          ? "Watch Video"
          : type === "shorts"
          ? "Watch Shorts"
          : type === "channel"
          ? "Visit Channel"
          : "Open Link";

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
      const o = row.original;

      const progressItems: JSX.Element[] = [];

      // Views
      if (o.boostPlan?.views) {
        const current = Number(o.progressViewCount ?? 0);
        const total = o.boostPlan.views;
        progressItems.push(
          <div key="views" className="flex items-center gap-1 text-sm">
            <Eye className="w-4 h-4 text-emerald-500" />
            <span>
              {current} / {total}
            </span>
          </div>
        );
      }

      // Likes
      if (o.boostPlan?.likes) {
        const current = Number(o.progressLikeCount ?? 0);
        const total = o.boostPlan.likes;
        progressItems.push(
          <div key="likes" className="flex items-center gap-1 text-sm">
            <ThumbsUp className="w-4 h-4 text-emerald-500" />
            <span>
              {current} / {total}
            </span>
          </div>
        );
      }

      // Subscribers
      if (o.boostPlan?.subscribers) {
        const current = Number(o.progressSubscriberCount ?? 0);
        const total = o.boostPlan.subscribers;
        progressItems.push(
          <div key="subs" className="flex items-center gap-1 text-sm">
            <UserPlus className="w-4 h-4 text-emerald-500" />
            <span>
              {current} / {total}
            </span>
          </div>
        );
      }

      return <div className="flex flex-col gap-1">{progressItems}</div>;
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

      const initialView = Number(o.initialViewCount ?? 0);
      const initialLike = Number(o.initialLikeCount ?? 0);
      const initialSub = Number(o.initialSubscriberCount ?? 0);

      const finalView = Number(o.finalViewCount ?? 0);
      const finalLike = Number(o.finalLikeCount ?? 0);
      const finalSub = Number(o.finalSubscriberCount ?? 0);

      const progressView = Number(o.progressViewCount ?? 0);
      const progressLike = Number(o.progressLikeCount ?? 0);
      const progressSub = Number(o.progressSubscriberCount ?? 0);

      const diffViews = finalView
        ? finalView - (initialView || progressView)
        : 0;
      const diffLikes = finalLike
        ? finalLike - (initialLike || progressLike)
        : 0;
      const diffSubs = finalSub ? finalSub - (initialSub || progressSub) : 0;

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
            start={initialView}
            end={finalView}
            diff={diffViews}
          />
          <StatItem
            icon={ThumbsUp}
            label="Likes"
            start={initialLike}
            end={finalLike}
            diff={diffLikes}
          />
          <StatItem
            icon={UserPlus}
            label="Subs"
            start={initialSub}
            end={finalSub}
            diff={diffSubs}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleString(),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => new Date(row.getValue("updatedAt")).toLocaleString(),
  },
];
