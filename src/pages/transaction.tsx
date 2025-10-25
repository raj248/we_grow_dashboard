import { useTransactions } from "@/hooks/useTransactions";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/user-table";
import { columns } from "@/components/columns/transaction";
import { useProtectAdminRoute } from "@/hooks/useProtectAdminRoute";

export default function TransactionPage() {
  const { data: transactions, isLoading } = useTransactions();
  console.log("In the Transaction Page");
  console.log(transactions);
  useProtectAdminRoute();

  if (isLoading) return <p>Loading...</p>;

  if (!transactions?.success)
    return <p>Error: {transactions?.error ?? "Unknown error"}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Transactions</h1>
      <Button className="mt-4" onClick={() => {}}>
        Reload
      </Button>

      <DataTable
        columns={columns}
        data={transactions.data}
        tableType="transaction"
        inputLabel="Filter by Transaction ID or User ID"
        onRowClick={(transaction) => {
          console.log("transaction : ", transaction.transactionId);
        }}
      />
    </div>
  );
}
