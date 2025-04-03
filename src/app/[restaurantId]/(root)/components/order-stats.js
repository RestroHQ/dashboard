"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const OrderStats = ({ averageOrderValue, topMenuItems }) => {
  // Convert topMenuItems to chart data format
  const chartData =
    topMenuItems?.map((item, index) => ({
      name: item.name || `Item ${index + 1}`,
      value: item.count || 0,
    })) || [];

  return (
    <Card className="flex flex-col h-fit">
      <CardHeader>
        <CardTitle>Top Menu Items</CardTitle>
        <CardDescription>
          Average order value: ${averageOrderValue?.toFixed(2) || 0}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
