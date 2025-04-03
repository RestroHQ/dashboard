"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const OrdersChart = ({ data, startDate, endDate }) => {
  const chartData = [
    {
      name: "Completed",
      value: data?.filter((d) => d.status === "completed").length || 0,
      fill: "var(--color-completed)",
    },
    {
      name: "Pending",
      value: data?.filter((d) => d.status === "pending").length || 0,
      fill: "var(--color-pending)",
    },
    {
      name: "Canceled",
      value: data?.filter((d) => d.status === "canceled").length || 0,
      fill: "var(--color-canceled)",
    },
  ];

  const totalOrders = chartData.reduce((acc, curr) => acc + curr.value, 0);

  const formatDateRange = (start, end) => {
    return `${start.toLocaleDateString("default", { month: "long" })} ${start.getFullYear()}`;
  };

  return (
    <Card className="flex flex-col h-fit">
      <CardHeader className="items-center pb-0">
        <CardTitle>Orders Summary</CardTitle>
        <CardDescription>{formatDateRange(startDate, endDate)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px]">
          <PieChart width={300} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
            >
              {chartData.map((entry, index) => (
                <React.Fragment key={`cell-${index}`}>
                  <text
                    x={300 / 2}
                    y={300 / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold"
                  >
                    {totalOrders}
                  </text>
                  <text
                    x={300 / 2}
                    y={300 / 2 + 20}
                    textAnchor="middle"
                    className="text-xs text-muted-foreground"
                  >
                    Orders
                  </text>
                </React.Fragment>
              ))}
            </Pie>
          </PieChart>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersChart;
