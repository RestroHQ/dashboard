import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    table: 8,
    order: "#53",
    status: "preparing",
  },
  {
    table: 2,
    order: "#54",
    status: "ready",
  },
  {
    table: 4,
    order: "#55",
    status: "pending-payment",
  },
  {
    table: 11,
    order: "#56",
    status: "preparing",
  },
  {
    table: 1,
    order: "#57",
    status: "ready",
  },
  {
    table: 9,
    order: "#58",
    status: "pending-payment",
  },
  {
    table: 6,
    order: "#59",
    status: "preparing",
  },
  {
    table: 5,
    order: "#60",
    status: "served",
  },
  {
    table: 3,
    order: "#61",
    status: "ready",
  },
  {
    table: 7,
    order: "#62",
    status: "preparing",
  },
  {
    table: 10,
    order: "#63",
    status: "pending-payment",
  },
];

export function OrdersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Table</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.order}>
            <TableCell className="font-medium">{order.order}</TableCell>
            <TableCell>{order.table}</TableCell>
            <TableCell>
              {order.status === "preparing" ? (
                <span className="bg-yellow-500/30 border text-xs border-yellow-500 py-1 px-3 rounded-full">
                  Preparing
                </span>
              ) : order.status === "ready" ? (
                <span className="bg-green-500/30 border text-xs border-een-500 py-1 px-3 rounded-full">
                  Ready
                </span>
              ) : (
                <span className="bg-red-500/30 border text-xs border-red-500 py-1 px-3 rounded-full">
                  Pending Payment
                </span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
