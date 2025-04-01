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
import { useGetCurrentRestaurantQuery } from "@/hooks/use-restaurant";
import { useGetSubscriptionQuery } from "@/hooks/use-subscription";
import { format } from "date-fns";
import Link from "next/link";

const Page = () => {
  const { data: restaurantId } = useGetCurrentRestaurantQuery();

  const { data: subscription } = useGetSubscriptionQuery(restaurantId);

  const formatDate = (dateString) => {
    if (!dateString || dateString === "1970-01-01T00:00:00.000Z") return "N/A";
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <PageHeader
          title="Billing"
          subtitle="Manage your restaurant's billing information"
        />
      </div>
      {subscription ? (
        <Card className="w-full mx-auto">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">
                  {subscription.plan.tier} Plan
                </CardTitle>
                <CardDescription>
                  ${subscription.plan.price}/{subscription.plan.interval}
                </CardDescription>
              </div>
              <Badge
                variant={
                  subscription.status === "ACTIVE" ? "default" : "destructive"
                }
              >
                {subscription.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Start Date
              </h3>
              <p>{formatDate(subscription.startDate)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                End Date
              </h3>
              <p>{formatDate(subscription.endDate)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Last Billing
              </h3>
              <p>{formatDate(subscription.lastBillingDate)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Next Billing
              </h3>
              <p>{formatDate(subscription.nextBillingDate)}</p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/${restaurantId}/billing/plans`}>Change Plan</Link>
            </Button>
            {subscription.status === "ACTIVE" ? (
              <Button variant="destructive">Cancel Subscription</Button>
            ) : (
              <Button>Reactivate</Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Subscription</CardTitle>
            <CardDescription>
              You are not currently subscribed to any plan. Subscribe now to
              start managing your restaurant.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href={`/${restaurantId}/billing/plans`}>
                Start Subscription
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default Page;
