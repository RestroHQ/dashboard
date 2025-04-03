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
import { removeCurrentRestaurant } from "@/services/cookies.service";
import { useGetAnalyticsMutation } from "@/hooks/use-analytics";
import { useEffect, useState } from "react";

const getMonthDateRange = () => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
};

const Page = ({ restaurantId }) => {
  const router = useRouter();
  const [dateRange, setDateRange] = useState(getMonthDateRange());
  const [analyticsData, setAnalyticsData] = useState(null);

  const {
    data: restaurant,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
  } = useGetRestaurantQuery(restaurantId);

  const { mutate: fetchAnalytics, isLoading: isAnalyticsLoading } =
    useGetAnalyticsMutation();

  useEffect(() => {
    if (restaurantId) {
      fetchAnalytics(
        {
          restaurantId,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
        {
          onSuccess: (data) => {
            setAnalyticsData(data);
          },
          onError: (error) => {
            console.error("Error fetching analytics:", error);
          },
        },
      );
    }
  }, [restaurantId, dateRange, fetchAnalytics]);

  if (!restaurantId || isRestaurantLoading || isAnalyticsLoading) {
    return <Loader />;
  }

  return (
    <div className="flex-1 space-y-4 w-full p-8">
      <PageHeader
        title="Overview"
        subtitle="A summary of your restaurant's performance"
      />

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 flex flex-col gap-4">
          <Cards
            totalCustomers={analyticsData?.customers?.total || 0}
            activeCustomers={analyticsData?.customers?.active || 0}
            totalOrders={analyticsData?.orders?.total || 0}
            totalRevenue={analyticsData?.orders?.revenue || 0}
          />

          <div className="grid gap-4 grid-cols-2">
            <OrderStats
              averageOrderValue={analyticsData?.orders?.averageOrderValue || 0}
              topMenuItems={analyticsData?.orders?.topMenuItems || []}
              topCustomers={analyticsData?.orders?.topCustomers || []}
            />

            <Card className="h-fit">
              <OrdersTable
                orderFrequency={
                  analyticsData?.customerBehavior?.orderFrequency || []
                }
              />
            </Card>
          </div>
        </div>

        <div className="col-span-1">
          <OrdersChart
            data={analyticsData?.customerBehavior?.orderFrequency || []}
            startDate={new Date(dateRange.startDate)}
            endDate={new Date(dateRange.endDate)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
