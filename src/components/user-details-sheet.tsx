import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTransactionsByUserId } from "@/hooks/useTransactions";

type UserDetailsSheetProps = {
  user: any | null;
  onClose: () => void;
};

export function UserDetailsSheet({ user, onClose }: UserDetailsSheetProps) {
  const { data: transactions, isLoading } = useTransactionsByUserId(
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
              {isLoading ? (
                <p>Loading transactions...</p>
              ) : transactions?.success ? (
                <ul>
                  {transactions.data.map((transaction: any) => (
                    <li key={transaction.transactionId}>
                      {transaction.amount} - {transaction.status}
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
