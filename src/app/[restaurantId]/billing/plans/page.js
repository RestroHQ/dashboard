"use client";

import PageHeader from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useGetPlansQuery } from "@/hooks/use-plan";
import { useGetCurrentRestaurantQuery } from "@/hooks/use-restaurant";
import {
  useCreateCheckoutSessionMutation,
  useGetSubscriptionQuery,
} from "@/hooks/use-subscription";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [interval, setInterval] = useState("month");

  const router = useRouter();
  const pathname = usePathname();

  const { toast } = useToast();

  const { data: restaurantId } = useGetCurrentRestaurantQuery();
  const { data: plans, isLoading } = useGetPlansQuery(restaurantId);

  const { mutateAsync: createCheckoutSession } =
    useCreateCheckoutSessionMutation({
      onSuccess: (data) => {},
      onError: (error) => {
        console.error("Error creating restaurant:", error);
      },
    });

  if (isLoading) {
    return (
      <main className="p-8">
        <div className="flex justify-between">
          <PageHeader
            title="Billing"
            subtitle="Manage your restaurant's billing information"
          />
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-8 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-10 w-24" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const filteredPlans = plans?.filter((plan) => plan.interval === interval);
  const tiers = [...new Set(filteredPlans?.map((plan) => plan.tier))];

  const handleCreateCheckoutSession = async (planId) => {
    try {
      const { url } = await createCheckoutSession({
        restaurantId,
        planId,
        successUrl: `${window.location.origin}/${pathname.replace("/plans", "")}`,
        cancelUrl: `${window.location.origin}/${pathname}`,
      });

      window.location.href = url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <PageHeader
          title="Plans"
          subtitle="Manage your restaurant's billing information"
        />
      </div>

      <div className="flex items-center justify-end w-full gap-3">
        {interval === "year" && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Save up to 15%
          </span>
        )}
        <Label htmlFor="billing-interval">Monthly</Label>
        <Switch
          id="billing-interval"
          checked={interval === "year"}
          onCheckedChange={(checked) => setInterval(checked ? "year" : "month")}
        />
        <Label htmlFor="billing-interval">Yearly</Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {tiers.map((tier) => {
          const plan = filteredPlans.find((p) => p.tier === tier);
          const yearlyPlan = plans.find(
            (p) => p.tier === tier && p.interval === "year",
          );
          const monthlyPlan = plans.find(
            (p) => p.tier === tier && p.interval === "month",
          );
          const isYearlySavings =
            interval === "year" && yearlyPlan && monthlyPlan;
          const savings = isYearlySavings
            ? parseFloat(monthlyPlan.price) * 12 - parseFloat(yearlyPlan.price)
            : 0;

          return (
            <Card
              key={tier}
              className={cn(
                "flex flex-col",
                tier === "PREMIUM" && "border-2 border-primary",
              )}
            >
              <CardHeader>
                <CardTitle className="text-2xl ">{tier}</CardTitle>
                <CardDescription>
                  {tier === "STARTER" && "Perfect for individuals"}
                  {tier === "PREMIUM" && "Great for small teams"}
                  {tier === "ENTERPRISE" && "For large organizations"}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col justify-between h-full">
                <div>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">
                      /{interval === "month" ? "month" : "year"}
                    </span>
                  </div>
                  {isYearlySavings && (
                    <div className="mb-4 text-sm text-green-600">
                      Save ${savings.toFixed(2)} compared to monthly
                    </div>
                  )}
                  <ul className="space-y-2">
                    {tier === "STARTER" && (
                      <>
                        <li>✓ 10 projects</li>
                        <li>✓ Basic analytics</li>
                        <li>✓ Email support</li>
                      </>
                    )}
                    {tier === "PREMIUM" && (
                      <>
                        <li>✓ 50 projects</li>
                        <li>✓ Advanced analytics</li>
                        <li>✓ Priority email support</li>
                        <li>✓ API access</li>
                      </>
                    )}
                    {tier === "ENTERPRISE" && (
                      <>
                        <li>✓ Unlimited projects</li>
                        <li>✓ Premium analytics</li>
                        <li>✓ 24/7 phone support</li>
                        <li>✓ Dedicated account manager</li>
                        <li>✓ Custom integrations</li>
                      </>
                    )}
                  </ul>
                </div>

                <Button
                  className="w-full mt-8"
                  variant={tier === "PREMIUM" ? "default" : "outline"}
                  onClick={() => handleCreateCheckoutSession(plan.id)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default Page;
