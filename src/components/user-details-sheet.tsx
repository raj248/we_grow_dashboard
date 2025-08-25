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

  return (
    <Sheet open={!!user} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full h-full max-w-full sm:max-w-full p-6 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>User Details</SheetTitle>
        </SheetHeader>

        {user && (
          <div className="space-y-6">
            <div>
              {/* <h2 className="text-lg font-semibold">{user.name}</h2> */}
              <p>User ID: {user.userId}</p>
              <p>
                Last Active: {format(new Date(user.lastActiveAt), "dd/MM/yyyy")}
              </p>
              <p>Joined At: {format(new Date(user.createdAt), "dd/MM/yyyy")}</p>
              <p>Wallet Balance: {user.wallet?.balance}</p>
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
