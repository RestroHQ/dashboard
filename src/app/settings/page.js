"use client";

import { useGetCurrentUserQuery } from "@/hooks/use-user";

const Page = () => {
  const { data: user } = useGetCurrentUserQuery();

  return (
    <div>
      <h1>Settings</h1>
      <p>{user?.name}</p>
    </div>
  );
};

export default Page;
