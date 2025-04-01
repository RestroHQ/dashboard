"use client";

import Loader from "@/components/common/loader";
import PageHeader from "@/components/dashboard/page-header";
import { DataTable } from "@/components/ui/data-table";
import { useGetMenusQuery } from "@/hooks/use-menu";
import { AddMenuDialog } from "./components/add-menu";
import { columns } from "./components/columns";
import { useGetTablesQuery } from "@/hooks/use-table";

const Page = ({ restaurantId }) => {
  const { data: tables, isLoading } = useGetTablesQuery(restaurantId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <PageHeader
          title="Tables"
          subtitle="Manage your restaurant's tables."
        />

        <AddMenuDialog restaurantId={restaurantId} />
      </div>

      <DataTable columns={columns} data={tables} keyword={"name"} />
    </main>
  );
};

export default Page;
