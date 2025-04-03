import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusColors = {
  preparing: "bg-yellow-500/30 border-yellow-500",
  ready: "bg-green-500/30 border-green-500",
  "pending-payment": "bg-red-500/30 border-red-500",
  completed: "bg-blue-500/30 border-blue-500",
  served: "bg-purple-500/30 border-purple-500",
};

export const OrdersTable = ({ orderFrequency }) => {
  if (!orderFrequency || orderFrequency.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={2}
              className="text-center text-muted-foreground py-8"
            >
              No orders found
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderFrequency.slice(0, 10).map((order, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              #{order.orderId || `ORD-${index + 1}`}
            </TableCell>
            <TableCell>
              <span
                className={`${statusColors[order.status] || "bg-gray-500/30 border-gray-500"} border text-xs py-1 px-3 rounded-full`}
              >
                {order.status || "Unknown"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
