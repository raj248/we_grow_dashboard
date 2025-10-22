import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOrdersByUserId } from "@/hooks/useOrders";
import { useTransactionsByUserId } from "@/hooks/useTransactions";
import type { Order, Transaction, User } from "@/types/entities";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, User as UserIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type UserDetailsSheetProps = {
  user: User | null;
  onClose: () => void;
};

export function UserDetailsSheet({ user, onClose }: UserDetailsSheetProps) {
  const { data: transactions, isLoading: isTransactionLoading } =
    useTransactionsByUserId(user ? user.userId : "");
  const { data: orders, isLoading: isOrderLoading } = useOrdersByUserId(
    user ? user.userId : ""
  );

  const renderStatusBadge = (status: string) => {
    const colorMap: Record<string, string> = {
      success: "bg-emerald-500 text-white",
      completed: "bg-emerald-500 text-white",
      pending: "bg-amber-500 text-white",
      failed: "bg-rose-500 text-white",
      cancelled: "bg-gray-500 text-white",
    };

    const colorClass =
      colorMap[status.toLowerCase()] || "bg-gray-400 text-white";

    return (
      <Badge className={`${colorClass} capitalize px-2 py-1 text-xs`}>
        {status}
      </Badge>
    );
  };

  return (
    <Sheet open={!!user} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full max-w-lg sm:max-w-xl p-6 overflow-y-auto space-y-6"
      >
        <SheetHeader>
          <SheetTitle>User Details</SheetTitle>
        </SheetHeader>

        {user && (
          <div className="space-y-6 mt-4">
            {/* User Info */}
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">User ID:</span> {user.userId}
              </p>
              <p>
                <span className="font-medium">Last Active:</span>{" "}
                {format(new Date(user.lastActiveAt), "dd/MM/yyyy")}
              </p>
              <p>
                <span className="font-medium">Joined At:</span>{" "}
                {format(new Date(user.createdAt), "dd/MM/yyyy")}
              </p>
              <p>
                <span className="font-medium">Wallet Balance:</span> ₹
                {user.wallet?.balance ?? 0}
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {/* Transactions */}
              <AccordionItem value="transactions">
                <AccordionTrigger>Transactions</AccordionTrigger>
                <AccordionContent>
                  {isTransactionLoading ? (
                    <p>Loading transactions...</p>
                  ) : transactions?.success && transactions.data.length > 0 ? (
                    <ul className="space-y-3">
                      {transactions.data.map((transaction: Transaction) => (
                        <li
                          key={transaction.id}
                          className="border p-3 rounded-md text-sm space-y-1"
                        >
                          <div className="flex justify-between">
                            <span className="font-medium">Transaction ID:</span>
                            <span>{transaction.transactionId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Amount:</span>
                            <span>₹{transaction.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Type:</span>
                            <span className="capitalize">
                              {transaction.type}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Source:</span>
                            <span>{transaction.source}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Created At:</span>
                            <span>
                              {format(
                                new Date(transaction.createdAt),
                                "dd/MM/yyyy HH:mm"
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Status:</span>
                            {renderStatusBadge(transaction.status)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No transactions found or an error occurred.</p>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Orders */}
              <AccordionItem value="orders">
                <AccordionTrigger>Orders</AccordionTrigger>
                <AccordionContent>
                  {isOrderLoading ? (
                    <p>Loading orders...</p>
                  ) : orders?.success && orders.data.length > 0 ? (
                    <ul className="space-y-3">
                      {orders.data.map((order: Order) => (
                        <li
                          key={order.id}
                          className="border p-3 rounded-md text-sm space-y-1"
                        >
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span>
                              {format(new Date(order.createdAt), "dd/MM/yyyy")}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Status:</span>
                            {renderStatusBadge(order.status)}
                          </div>
                          <div className="flex justify-between">
                            <dt className="font-semibold">Plan</dt>
                            <dd>
                              {order.boostPlan ? (
                                <HoverCard>
                                  <HoverCardTrigger>
                                    <span className="text-blue-600 hover:underline cursor-pointer transition-colors">
                                      {order.boostPlan.title}
                                    </span>
                                  </HoverCardTrigger>
                                  <HoverCardContent className="w-64 p-4 space-y-2">
                                    <p className="font-semibold text-sm">
                                      {order.boostPlan.title}
                                    </p>
                                    <div className="text-xs text-muted-foreground">
                                      <p>
                                        <span className="font-medium">
                                          Price:
                                        </span>{" "}
                                        {order.boostPlan.price}
                                      </p>
                                      <p>
                                        <span className="font-medium">
                                          Duration:
                                        </span>{" "}
                                        {order.boostPlan.duration} Seconds
                                      </p>
                                      <p>
                                        <span className="font-medium">
                                          Reward:
                                        </span>{" "}
                                        {order.boostPlan.reward}
                                      </p>
                                      <p>
                                        <span className="font-medium">
                                          Views:
                                        </span>{" "}
                                        {order.boostPlan.views} |{" "}
                                        <span className="font-medium">
                                          Likes:
                                        </span>{" "}
                                        {order.boostPlan.likes} |{" "}
                                        <span className="font-medium">
                                          Subscribers:
                                        </span>{" "}
                                        {order.boostPlan.subscribers}
                                      </p>
                                      {order.boostPlan.description && (
                                        <p className="mt-1 text-xs text-muted-foreground">
                                          {order.boostPlan.description}
                                        </p>
                                      )}
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              ) : (
                                <span className="text-muted-foreground">
                                  N/A
                                </span>
                              )}
                            </dd>
                          </div>
                          <div className="flex justify-between">
                            <span>Channel / Video:</span>
                            <a
                              href={order.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="truncate max-w-[200px] text-blue-500"
                            >
                              {order.url}
                            </a>
                          </div>
                          <div className="grid grid-cols-4 gap-3 mt-2 text-xs text-muted-foreground">
                            {/* Initial */}
                            <div className="space-y-1">
                              <dt className="font-semibold text-[13px]">
                                Initial
                              </dt>
                              <dd className="flex flex-col gap-1">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />{" "}
                                  {order.initialViewCount || "--"}
                                </span>
                                <span className="flex items-center gap-1">
                                  <ThumbsUp className="w-3 h-3" />{" "}
                                  {order.initialLikeCount || "--"}
                                </span>
                                <span className="flex items-center gap-1">
                                  <UserIcon className="w-3 h-3" />{" "}
                                  {order.initialSubscriberCount || "--"}
                                </span>
                              </dd>
                            </div>

                            {/* Progress */}
                            <div className="space-y-1">
                              <dt className="font-semibold text-[13px]">
                                Progress
                              </dt>
                              <dd className="flex flex-col gap-1">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />{" "}
                                  {order.progressViewCount || "--"}
                                </span>
                                <span className="flex items-center gap-1">
                                  <ThumbsUp className="w-3 h-3" />{" "}
                                  {order.progressLikeCount || "--"}
                                </span>
                                <span className="flex items-center gap-1">
                                  <UserIcon className="w-3 h-3" />{" "}
                                  {order.progressSubscriberCount || "--"}
                                </span>
                              </dd>
                            </div>

                            {/* Required (BoostPlan) */}
                            <div className="space-y-1">
                              <dt className="font-semibold text-[13px]">
                                Required
                              </dt>
                              <dd className="flex flex-col gap-1">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />{" "}
                                  {order.boostPlan?.views || "--"}
                                </span>
                                <span className="flex items-center gap-1">
                                  <ThumbsUp className="w-3 h-3" />{" "}
                                  {order.boostPlan?.likes || "--"}
                                </span>
                                <span className="flex items-center gap-1">
                                  <UserIcon className="w-3 h-3" />{" "}
                                  {order.boostPlan?.subscribers || "--"}
                                </span>
                              </dd>
                            </div>

                            {/* Final */}
                            <div className="space-y-1">
                              <dt className="font-semibold text-[13px]">
                                Final
                              </dt>
                              <dd className="flex flex-col gap-1">
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />{" "}
                                  {order.finalViewCount || "--"}
                                </span>
                                <span className="flex items-center gap-1">
                                  <ThumbsUp className="w-3 h-3" />{" "}
                                  {order.finalLikeCount || "--"}
                                </span>
                                <span className="flex items-center gap-1">
                                  <UserIcon className="w-3 h-3" />{" "}
                                  {order.finalSubscriberCount || "--"}
                                </span>
                              </dd>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No orders found or an error occurred.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
