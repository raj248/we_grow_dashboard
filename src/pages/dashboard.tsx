import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProtectAdminRoute } from "@/hooks/useProtectAdminRoute";
import { useOrders } from "@/hooks/useOrders";
import dayjs from "dayjs";
import type { Order } from "@/types/entities";

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
        o.status !== "COMPLETED" &&
        dayjs(o.createdAt).isBefore(now.subtract(48, "hour"))
    );
  }, [orders]);

  // Active orders (not completed)
  const activeOrders = useMemo(() => {
    if (!orders) return [];
    return orders.data.filter((o) => o.status !== "COMPLETED");
  }, [orders]);

  // Status badge colors
  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    ACTIVE: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const renderOrder = (order: Order) => {
    if (!order.boostPlan) return null;

    const metrics: {
      label: string;
      progress: number;
      total: number;
      color: string;
    }[] = [];

    // Add views if boostPlan.views > 0
    if (order.boostPlan.views > 0) {
      metrics.push({
        label: "Views",
        progress: order.progressViewCount ?? 0,
        total: order.boostPlan.views ?? 0,
        color: "#3B82F6", // Blue
      });
    }

    // Add likes if boostPlan.likes > 0
    if (order.boostPlan.likes > 0) {
      metrics.push({
        label: "Likes",
        progress: order.progressLikeCount ?? 0,
        total: order.boostPlan.likes ?? 0,
        color: "#EF4444", // Red
      });
    }

    // Add subscribers if boostPlan.subscribers > 0
    if (order.boostPlan.subscribers > 0) {
      metrics.push({
        label: "Subscribers",
        progress: order.progressSubscriberCount ?? 0,
        total: order.boostPlan.subscribers ?? 0,
        color: "#10B981", // Green
      });
    }

    return (
      <div
        key={order.id}
        className="flex flex-col gap-2 p-3 shadow-sm rounded-md border border-border"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <span className="font-semibold">Order #{order.id}</span>
          <span
            className={`px-2 py-1 text-xs rounded-full font-medium ${
              statusColors[order.status]
            }`}
          >
            {order.status}
          </span>
        </div>

        {/* User & Plan */}
        {order.userId && (
          <span className="text-sm text-muted-foreground">
            User: {order.userId}
          </span>
        )}
        {order.boostPlan && (
          <span className="text-sm text-muted-foreground">
            Plan: {order.boostPlan.title}
          </span>
        )}

        {/* Started date */}
        <span className="text-sm text-muted-foreground">
          Started: {dayjs(order.createdAt).format("HH:mm DD/MM")}
        </span>

        {/* Metrics */}
        {metrics.map((metric) => {
          const percentage = Math.min(
            100,
            ((metric.progress ?? 0) / Math.max(metric.total, 1)) * 100
          );
          return (
            <div key={metric.label} className="flex flex-col gap-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{metric.label}</span>
                <span>
                  {metric.progress} / {metric.total}
                </span>
              </div>
              <div className="h-2 w-full bg-sidebar-accent rounded-full">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: metric.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

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
                <CardTitle>Active Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{activeOrders.length}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Orders Lists */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Orders Last 24H</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-16 w-full rounded-md" />
              ))
            ) : ordersLast24Hrs.length ? (
              ordersLast24Hrs.map(renderOrder)
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
          <CardContent className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-16 w-full rounded-md" />
              ))
            ) : lateOrders.length ? (
              lateOrders.map(renderOrder)
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
          <CardContent className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-16 w-full rounded-md" />
              ))
            ) : activeOrders.length ? (
              activeOrders.map(renderOrder)
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
