import { useOrders } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/user-table";
import { columns } from "@/components/columns/order";

export default function OrderPage() {
  const { data: orders, isLoading } = useOrders();
  console.log("In the Orders Page");
  console.log(orders);
  if (isLoading) return <p>Loading...</p>;

  if (!orders?.success) return <p>Error: {orders?.error ?? "Unknown error"}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <Button className="mt-4" onClick={() => {}}>
        Reload
      </Button>

      <DataTable
        columns={columns}
        data={orders.data}
        onRowClick={(order) => {
          console.log("order : ", order.id);
        }}
      />
    </div>
  );
}
