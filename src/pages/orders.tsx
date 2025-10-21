import { useOrders } from "@/hooks/useOrders";
import { DataTable } from "@/components/table/user-table";
import { columns } from "@/components/columns/order";
import { OrderDetailsSheet } from "@/components/order-details-sheet";
import { useState } from "react";

export default function OrderPage() {
  const { data: orders, isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  console.log("In the Orders Page");
  console.log(orders);
  if (isLoading) return <p>Loading...</p>;

  if (!orders?.success) return <p>Error: {orders?.error ?? "Unknown error"}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Orders</h1>

      <DataTable
        columns={columns}
        data={orders.data}
        onRowClick={(order) => {
          console.log("Row clicked:", order);
          setSelectedOrder(order);
        }}
      />

      <OrderDetailsSheet
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
