"use client";

import Loader from "@/components/common/loader";
import PageHeader from "@/components/dashboard/page-header";
import { DataTable } from "@/components/ui/data-table";
import { useGetRestaurantQuery } from "@/hooks/use-restaurant";
import { useRouter } from "next/navigation";
import { columns } from "./components/columns";
import { CreateOrderDialog } from "./components/create-order";

const Page = ({ restaurantId }) => {
  const router = useRouter();

  const { data: restaurant, isLoading } = useGetRestaurantQuery(restaurantId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <PageHeader title="Orders" subtitle="Manage your restaurant's orders" />

        <CreateOrderDialog restaurantId={restaurantId} />
      </div>

      <DataTable columns={columns} data={{}} />
    </main>
  );
};

export default Page;
