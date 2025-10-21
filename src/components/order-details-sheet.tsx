import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteOrder, useOrdersByUserId } from "@/hooks/useOrders";
import { useTransactionsByUserId } from "@/hooks/useTransactions";
import { useUser } from "@/hooks/useUsers";
import type { Order, Transaction } from "@/types/entities";
import { MoreVertical } from "lucide-react";
import { Eye, ThumbsUp, User } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type UserDetailsSheetProps = {
  order: Order | null;
  onClose: () => void;
};

export function OrderDetailsSheet({ order, onClose }: UserDetailsSheetProps) {
  const { data: transactions, isLoading: isTransactionLoading } =
    useTransactionsByUserId(order ? order.userId : "");

  const { data: orders, isLoading: isOrderLoading } = useOrdersByUserId(
    order ? order.userId : ""
  );

  const { data: user, isLoading: isUserLoading } = useUser(
    order ? order.userId : ""
  );

  const deleteOrder = useDeleteOrder();

  return (
    <Sheet open={!!order} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full max-w-lg sm:max-w-xl p-6 overflow-y-auto space-y-6"
      >
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">
              Order Details
            </SheetTitle>

            {/* Update dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    // placeholder for future update flow
                    console.log("Update order", order?.id);
                  }}
                >
                  Update Order
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600 focus:bg-red-50"
                  onClick={() => {
                    if (order) {
                      deleteOrder.mutate(order.id);
                      onClose();
                    }
                  }}
                >
                  Delete Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SheetHeader>

        {order && (
          <div className="space-y-8">
            {/* USER INFO */}
            {!isUserLoading && user?.data && (
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  User Information
                </h3>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="font-semibold">User ID</dt>
                    <dd className="truncate text-muted-foreground">
                      {order.userId}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Wallet</dt>
                    <dd className="text-muted-foreground">
                      ₹{user.data.wallet?.balance ?? 0}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Last Active</dt>
                    <dd className="text-muted-foreground">
                      {user.data.lastActiveAt
                        ? format(
                            new Date(user.data.lastActiveAt),
                            "dd MMM yyyy"
                          )
                        : "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Joined</dt>
                    <dd className="text-muted-foreground">
                      {format(new Date(order.createdAt), "dd MMM yyyy")}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            {/* ORDER INFO */}
            <div className="relative rounded-lg border bg-card p-4 shadow-sm">
              {/* Status Badge */}
              <span
                className={`absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                  order.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : order.status === "ACTIVE"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "CANCELLED"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status.toLowerCase()}
              </span>

              <h3 className="text-sm font-medium text-muted-foreground mb-3 mt-1">
                Order Information
              </h3>

              <dl className="space-y-2 text-sm">
                {/* Basic Info */}
                <div>
                  <dt className="font-semibold">Order ID</dt>
                  <dd className="text-muted-foreground break-all">
                    {order.id}
                  </dd>
                </div>

                <div>
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
                              <span className="font-medium">Price:</span>{" "}
                              {order.boostPlan.price}
                            </p>
                            <p>
                              <span className="font-medium">Duration:</span>{" "}
                              {order.boostPlan.duration} Seconds
                            </p>
                            <p>
                              <span className="font-medium">Reward:</span>{" "}
                              {order.boostPlan.reward}
                            </p>
                            <p>
                              <span className="font-medium">Views:</span>{" "}
                              {order.boostPlan.views} |{" "}
                              <span className="font-medium">Likes:</span>{" "}
                              {order.boostPlan.likes} |{" "}
                              <span className="font-medium">Subscribers:</span>{" "}
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
                      <span className="text-muted-foreground">N/A</span>
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold">URL</dt>
                  <dd>
                    <a
                      href={order.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline transition-colors break-all"
                    >
                      {order.url}
                    </a>
                  </dd>
                </div>

                {/* Counts Breakdown with Icons */}
                <div className="grid grid-cols-4 gap-3 mt-3 text-xs text-muted-foreground">
                  {/* Initial */}
                  <div className="space-y-1">
                    <dt className="font-semibold text-[13px]">Initial</dt>
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
                        <User className="w-3 h-3" />{" "}
                        {order.initialSubscriberCount || "--"}
                      </span>
                    </dd>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1">
                    <dt className="font-semibold text-[13px]">Progress</dt>
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
                        <User className="w-3 h-3" />{" "}
                        {order.progressSubscriberCount || "--"}
                      </span>
                    </dd>
                  </div>

                  {/* Required (BoostPlan) */}
                  <div className="space-y-1">
                    <dt className="font-semibold text-[13px]">Required</dt>
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
                        <User className="w-3 h-3" />{" "}
                        {order.boostPlan?.subscribers || "--"}
                      </span>
                    </dd>
                  </div>

                  {/* Final */}
                  <div className="space-y-1">
                    <dt className="font-semibold text-[13px]">Final</dt>
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
                        <User className="w-3 h-3" />{" "}
                        {order.finalSubscriberCount || "--"}
                      </span>
                    </dd>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3 mt-3 text-sm text-muted-foreground">
                  <div>
                    <dt className="font-semibold">Created</dt>
                    <dd>
                      {format(new Date(order.createdAt), "dd MMM yyyy HH:mm")}
                      {/* {user.data.lastActiveAt
                        ? format(
                            new Date(user.data.lastActiveAt),
                            "dd MMM yyyy"
                          )
                        : "N/A"} */}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Updated</dt>
                    <dd>
                      {format(new Date(order.updatedAt), "dd MMM yyyy HH:mm")}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* ACCORDION SECTION */}
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="transactions">
                <AccordionTrigger>Transactions</AccordionTrigger>
                <AccordionContent>
                  {isTransactionLoading ? (
                    <p className="text-sm text-muted-foreground">
                      Loading transactions...
                    </p>
                  ) : transactions?.success && transactions.data.length > 0 ? (
                    <ul className="divide-y divide-border">
                      {transactions.data.map((t: Transaction) => (
                        <li
                          key={t.id}
                          className="p-3 rounded-md hover:bg-muted transition-colors cursor-pointer"
                          onClick={() =>
                            console.log("Navigate to transaction", t.id)
                          }
                        >
                          {/* Top Row: Type & Amount */}
                          <div className="flex justify-between items-center text-sm font-medium">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                                t.type === "CREDIT"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {t.type.toLowerCase()}
                            </span>
                            <span
                              className={`font-semibold ${
                                t.type === "CREDIT"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {t.type === "CREDIT" ? "+" : "-"}₹{t.amount}
                            </span>
                          </div>

                          {/* Details */}
                          <div className="mt-1 text-xs text-muted-foreground flex flex-col gap-0.5">
                            <span>
                              <span className="font-medium">Source:</span>{" "}
                              {t.source}
                            </span>
                            <span>
                              <span className="font-medium">
                                Transaction ID:
                              </span>{" "}
                              {t.transactionId}
                            </span>
                            <span>
                              <span className="font-medium">Date:</span>{" "}
                              {format(
                                new Date(t.createdAt),
                                "dd MMM yyyy, HH:mm"
                              )}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="font-medium">Status:</span>
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                                  t.status === "SUCCESS"
                                    ? "bg-green-100 text-green-800"
                                    : t.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {t.status.toLowerCase()}
                              </span>
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No transactions found.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="orders">
                <AccordionTrigger>Other Orders</AccordionTrigger>
                <AccordionContent>
                  {isOrderLoading ? (
                    <p className="text-sm text-muted-foreground">
                      Loading orders...
                    </p>
                  ) : orders?.success && orders.data.length > 0 ? (
                    <ul className="divide-y divide-border">
                      {orders.data.map((o: Order) => (
                        <li
                          key={o.id}
                          className="p-3 rounded-md hover:bg-muted transition-colors cursor-pointer"
                          onClick={() => console.log("Navigate to order", o.id)}
                        >
                          <div className="flex justify-between text-sm font-medium">
                            <span>{o.boostPlan?.title ?? "Unknown Plan"}</span>
                            <span className="text-muted-foreground capitalize">
                              {o.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(o.createdAt), "dd MMM yyyy")} •{" "}
                            {o.completedCount}/{o.boostPlan?.views}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No other orders found.
                    </p>
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
