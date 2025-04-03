"use client";

import Loader from "@/components/common/loader";
import PageHeader from "@/components/dashboard/page-header";
import { DataTable } from "@/components/ui/data-table";
import { useGetMenusQuery } from "@/hooks/use-menu";
import { useRouter } from "next/navigation";
import { columns } from "./components/columns";
import { MenuSheet } from "./components/menu-sheet";

const Page = ({ restaurantId }) => {
  const router = useRouter();

  const { data: menus, isLoading } = useGetMenusQuery(restaurantId);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <PageHeader title="Menus" subtitle="Manage your restaurant's menus." />

        <MenuSheet restaurantId={restaurantId} />
      </div>

      <DataTable columns={columns} data={menus} keyword={"name"} />
    </main>
  );
};

export default Page;
