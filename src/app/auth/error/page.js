"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorCode = searchParams.get("error");

  const { logOut } = useAuth();

  if (!errorCode) {
    if (typeof window !== "undefined") {
      router.push("/auth/login");
    }
    return null;
  }

  const errorMessages = {
    403: {
      title: "Unauthorized Access",
      message: "You do not have permission to access this page.",
    },
  };

  return (
    <div className="container max-w-3xl text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-red-500">{errorCode}</h1>
      <h2 className="text-2xl font-semibold mt-4">
        {errorMessages[errorCode].title}
      </h2>
      <p className="text-lg mt-2 text-gray-600">
        {errorMessages[errorCode].message || "An error occurred."} Please
        contact the administrator to resolve this issue and try again.
      </p>
      <Button onClick={logOut} className="mt-6">
        Log Out
      </Button>
    </div>
  );
}
