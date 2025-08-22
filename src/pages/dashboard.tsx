import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useProtectAdminRoute } from "@/hooks/useProtectAdminRoute";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  useProtectAdminRoute();
  const dummyData = [
    { name: "Mon", views: 120, completed: 30, new: 12 },
    { name: "Tue", views: 200, completed: 50, new: 20 },
    { name: "Wed", views: 150, completed: 40, new: 15 },
    { name: "Thu", views: 220, completed: 60, new: 25 },
    { name: "Fri", views: 300, completed: 80, new: 35 },
    { name: "Sat", views: 180, completed: 45, new: 18 },
    { name: "Sun", views: 250, completed: 70, new: 28 },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-24 w-full rounded-xl" />
          ))
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">2</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">24</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">26</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Weekly Engagement</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#5B42F3"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#AF40FF"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="new"
                stroke="#00DDEB"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
