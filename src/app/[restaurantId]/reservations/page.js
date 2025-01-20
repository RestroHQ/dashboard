"use client";

import PageHeader from "@/components/dashboard/page-header";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { columns } from "./components/columns";

const Page = ({ restaurantId }) => {
  const router = useRouter();

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <PageHeader
          title="Reservations"
          subtitle="Manage your restaurant's reservations"
        />
      </div>

      <DataTable columns={columns} data={{}} />
    </main>
  );
};

export default Page;
