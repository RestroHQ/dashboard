"use client";

import Loader from "@/components/common/loader";
import { Card } from "@/components/ui/card";
import { useGetRestaurantQuery } from "@/hooks/use-restaurant";
import { useRouter } from "next/navigation";
import Cards from "./components/cards";
import { OrderStats } from "./components/order-stats";
import { OrdersChart } from "./components/orders-chart";
import { OrdersTable } from "./components/orders-table";
import PageHeader from "@/components/dashboard/page-header";

const data = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 6890 },
  { name: "Sat", sales: 8390 },
  { name: "Sun", sales: 7490 },
];

const Page = ({ restaurantId }) => {
  const router = useRouter();

  const { data, isLoading } = useGetRestaurantQuery(restaurantId);

  if (!restaurantId || isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex-1 space-y-4 w-full p-8">
      <PageHeader title={data.name} subtitle="Your restaurant overview." />

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
};

export default Page;
