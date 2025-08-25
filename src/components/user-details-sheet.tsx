import { format } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOrdersByUserId } from "@/hooks/useOrders";
import { useTransactionsByUserId } from "@/hooks/useTransactions";
import type { Order, Transaction } from "@/types/entities";

type UserDetailsSheetProps = {
  user: any | null;
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
        className="w-full h-full max-w-full sm:max-w-full p-6"
      >
        <SheetHeader>
          <SheetTitle>User Details</SheetTitle>
        </SheetHeader>

        {user && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>User ID: {user.userId}</p>

            {/* Example sections */}
            <div className="mt-6">
              <h3 className="font-medium">Transactions</h3>
              {/* Transactions component goes here */}
              {isTransactionLoading ? (
                <p>Loading transactions...</p>
              ) : transactions?.success ? (
                <ul>
                  {transactions.data.map((transaction: Transaction) => (
                    <li key={transaction.id}>
                      {transaction.transactionId} - {transaction.amount} -{" "}
                      {transaction.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No transactions found or an error occurred.</p>
              )}
            </div>
            <div>
              <h3 className="font-medium">Orders</h3>
              {/* Orders component goes here */}
              {isOrderLoading ? (
                <p>Loading Orders...</p>
              ) : orders?.success ? (
                <ul>
                  {orders.data.map((order: Order) => (
                    <li key={order.id}>
                      {format(new Date(order.createdAt), "dd/MM/yyyy")} -{" "}
                      {order.status}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders found or an error occurred.</p>
              )}
            </div>
            <div>
              <h3 className="font-medium">Watch History</h3>
              {/* Watch history component goes here */}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
