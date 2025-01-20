"use client";

import Loader from "@/components/common/loader";
import PageHeader from "@/components/dashboard/page-header";
import { DataTable } from "@/components/ui/data-table";
import { useGetMenusQuery } from "@/hooks/use-menu";
import { useGetRestaurantQuery } from "@/hooks/use-restaurant";
import { useRouter } from "next/navigation";
import { AddMenuDialog } from "./components/add-menu";
import { columns } from "./components/columns";

const Page = ({ restaurantId }) => {
  const router = useRouter();

  const { data: restaurant, isLoading } = useGetRestaurantQuery(restaurantId);
  const { data: menus, isLoading: isMenusLoading } =
    useGetMenusQuery(restaurantId);

  if (isLoading || isMenusLoading) {
    return <Loader />;
  }

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <PageHeader title="Menus" subtitle="Manage your restaurant's menus." />

        <AddMenuDialog restaurantId={restaurantId} />
      </div>

      <DataTable columns={columns} data={menus} keyword={"name"} />
    </main>
  );
};

export default Page;
