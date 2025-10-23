import { useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProtectAdminRoute } from "@/hooks/useProtectAdminRoute";
import { useOrders } from "@/hooks/useOrders";
import dayjs from "dayjs";

export default function Dashboard() {
  useProtectAdminRoute();

  const { data: orders, isLoading } = useOrders();

  // Orders in last 24 hours
  const ordersLast24Hrs = useMemo(() => {
    if (!orders) return [];
    const now = dayjs();
    return orders.data.filter((o) =>
      dayjs(o.createdAt).isAfter(now.subtract(24, "hour"))
    );
  }, [orders]);

  // Late orders (>48 hours & not completed)
  const lateOrders = useMemo(() => {
    if (!orders) return [];
    const now = dayjs();
    return orders.data.filter(
      (o) =>
        !o.status.includes("COMPLETED") &&
        dayjs(o.createdAt).isBefore(now.subtract(48, "hour"))
    );
  }, [orders]);

  // Currently active order (most recent non-completed)
  const activeOrder = useMemo(() => {
    if (!orders) return null;
    const ongoing = orders.data
      .filter((o) => !o.status.includes("COMPLETED"))
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    return ongoing[0] || null;
  }, [orders]);

  // Active orders (not completed)
  const activeOrders = useMemo(() => {
    if (!orders) return [];
    return orders.data.filter((o) => !o.status.includes("COMPLETED"));
  }, [orders]);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-24 w-full rounded-xl" />
          ))
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Orders Last 24H</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{ordersLast24Hrs.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Late Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{lateOrders.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{orders?.data.length ?? 0}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Order</CardTitle>
              </CardHeader>
              <CardContent>
                {activeOrder ? (
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">
                      Order #{activeOrder.id}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Started:{" "}
                      {dayjs(activeOrder.createdAt).format("HH:mm DD/MM")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Status: {activeOrder.status}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    No active orders
                  </span>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Recent Orders List */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Orders Last 24H</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-10 w-full rounded-md" />
              ))
            ) : ordersLast24Hrs.length ? (
              ordersLast24Hrs.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between p-2 bg-muted rounded-md"
                >
                  <span>Order #{order.id}</span>
                  <span className="font-semibold">
                    {dayjs(order.createdAt).format("HH:mm DD/MM")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                No recent orders
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Late Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-10 w-full rounded-md" />
              ))
            ) : lateOrders.length ? (
              lateOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between p-2 bg-red-100 rounded-md"
                >
                  <span>Order #{order.id}</span>
                  <span className="font-semibold text-red-600">
                    {dayjs(order.createdAt).format("HH:mm DD/MM")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                No late orders
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-10 w-full rounded-md" />
              ))
            ) : activeOrders.length ? (
              activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between p-2 bg-green-100 rounded-md"
                >
                  <span>Order #{order.id}</span>
                  <span className="font-semibold text-green-700">
                    {dayjs(order.createdAt).format("HH:mm DD/MM")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                No active orders
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
