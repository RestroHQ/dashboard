"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import React from "react";

const UnauthorizedPage = () => {
  const { logOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold text-red-500">403</h1>
      <h2 className="text-2xl font-semibold mt-4">Unauthorized Access</h2>
      <p className="text-lg mt-2 text-gray-600">
        You do not have permission to access this page. Please contact your
        administrator for more information.
      </p>
      <Button onClick={logOut} className="mt-8">
        Log Out
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
