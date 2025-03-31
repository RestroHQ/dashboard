"use client";

import PageHeader from "@/components/dashboard/page-header";
import { useRouter } from "next/navigation";

const Page = ({ restaurantId }) => {
  const router = useRouter();

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <PageHeader
          title="Billing"
          subtitle="Manage your restaurant's billing information"
        />
      </div>
    </main>
  );
};

export default Page;
