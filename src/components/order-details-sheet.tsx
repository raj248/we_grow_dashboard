import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDeleteOrder, useOrdersByUserId } from "@/hooks/useOrders";
import { useTransactionsByUserId } from "@/hooks/useTransactions";
import type { Order, Transaction } from "@/types/entities";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useUser } from "@/hooks/useUsers";
import { Button } from "./ui/button";

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
        className="w-full h-full max-w-full sm:max-w-full p-6 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Order Details</SheetTitle>
        </SheetHeader>

        {order && (
          <div className="space-y-6">
            {!isUserLoading && (
              <div>
                <p>User ID: {order.userId}</p>
                {user?.data.lastActiveAt && (
                  <span>
                    Last Active:{" "}
                    {format(new Date(user?.data?.lastActiveAt), "dd/MM/yyyy")}
                    {"\n"}
                  </span>
                )}
                <p>
                  Created At: {format(new Date(order.createdAt), "dd/MM/yyyy")}
                </p>
                <p>Wallet Balance: {user?.data?.wallet?.balance}</p>
              </div>
            )}

            {/* delete order button */}
            <Button
              onClick={() => {
                deleteOrder.mutate(order.id);
                onClose();
              }}
              variant="destructive"
              className="mt-4"
            >
              Delete Order
            </Button>
            {/* showing order details */}
            <div className="border p-4 rounded-md space-y-2">
              <h3 className="text-md font-semibold">Order Information</h3>
              <p>Order ID: {order.id}</p>
              <p>Plan: {order.boostPlan?.title ?? "N/A"}</p>
              <p>
                URL:{" "}
                <a
                  href={order.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {order.url}
                </a>
              </p>
              <p>Status: {order.status}</p>
              <p>
                Created: {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
              </p>
              <p>
                Updated: {format(new Date(order.updatedAt), "dd/MM/yyyy HH:mm")}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-medium">Initial Counts:</p>
                  <p>Views: {order.initialViewCount}</p>
                  <p>Likes: {order.initialLikeCount}</p>
                  <p>Subscribers: {order.initialSubscriberCount}</p>
                </div>
                <div>
                  <p className="font-medium">Progress Counts:</p>
                  <p>Views: {order.progressViewCount}</p>
                  <p>Likes: {order.progressLikeCount}</p>
                  <p>Subscribers: {order.progressSubscriberCount}</p>
                </div>
                <div>
                  <p className="font-medium">Final Counts:</p>
                  <p>Views: {order.finalViewCount}</p>
                  <p>Likes: {order.finalLikeCount}</p>
                  <p>Subscribers: {order.finalSubscriberCount}</p>
                </div>
              </div>
              <p>
                Completed: {order.completedCount}{" "}
                {order.boostPlan?.views ? `/ ${order.boostPlan.views}` : ""}
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {/* Transactions */}
              <AccordionItem value="transactions">
                <AccordionTrigger>Transactions</AccordionTrigger>
                <AccordionContent>
                  {isTransactionLoading ? (
                    <p>Loading transactions...</p>
                  ) : transactions?.success ? (
                    <ul className="space-y-2">
                      {transactions.data.map((transaction: Transaction) => (
                        <li
                          key={transaction.id}
                          className="border p-2 rounded-md text-sm"
                        >
                          <div>Transaction ID: {transaction.transactionId}</div>
                          <div>Amount: {transaction.amount}</div>
                          <div>Type: {transaction.type}</div>
                          <div>Source: {transaction.source}</div>
                          <div>Created At: {transaction.createdAt}</div>
                          <div>Status: {transaction.status}</div>
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
                    <p>Loading Orders...</p>
                  ) : orders?.success ? (
                    <ul className="space-y-2">
                      {orders.data.map((order: Order) => (
                        <li
                          key={order.id}
                          className="border p-2 rounded-md text-sm"
                        >
                          <div>
                            Date:{" "}
                            {format(new Date(order.createdAt), "dd/MM/yyyy")}
                          </div>
                          <div>Status: {order.status}</div>
                          <div>Plan : {order.boostPlan?.title}</div>
                          <div>Video : {order.url}</div>
                          <div>
                            Progress: {order.completedCount}/{" "}
                            {order.boostPlan?.views}
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
