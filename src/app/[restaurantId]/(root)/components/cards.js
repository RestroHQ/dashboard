import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, DollarSign, Users } from "lucide-react";

const Cards = ({
  totalCustomers,
  activeCustomers,
  totalOrders,
  totalRevenue,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalRevenue?.toLocaleString() || 0}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalCustomers?.toLocaleString() || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {activeCustomers || 0} active customers
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalOrders?.toLocaleString() || 0}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
