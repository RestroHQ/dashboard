"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="container max-w-3xl text-center flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">
        Oops! Something went wrong.
      </h2>
      <p className="text-lg mt-2 text-gray-600">
        We can't seem to find the page you're looking for. Try going back to the
        homepage.
      </p>
      <Button onClick={() => router.push("/")} className="mt-4">
        Go back to home
      </Button>
    </div>
  );
}
