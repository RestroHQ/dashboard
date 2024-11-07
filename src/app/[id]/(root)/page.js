"use client";

import { Card } from "@/components/ui/card";
import Cards from "./components/cards";
import { OrderStats } from "./components/order-stats";
import { OrdersChart } from "./components/orders-chart";
import { OrdersTable } from "./components/orders-table";
import { UserNav } from "@/components/dashboard/user-nav";

const data = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 6890 },
  { name: "Sat", sales: 8390 },
  { name: "Sun", sales: 7490 },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 w-full">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <UserNav />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          <Cards />

          <div className="grid gap-4 grid-cols-2">
            <OrderStats />

            <Card className="h-fit">
              <OrdersTable />
            </Card>
          </div>
        </div>

        <div className="col-span-1">
          <OrdersChart />
        </div>
      </div>
    </div>
  );
}
