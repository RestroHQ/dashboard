"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/reusable/data-table-column-header";

export const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.customer?.firstName} {row.customer?.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "table",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Table" />
    ),
    cell: ({ row }) => {
      return <div>{row.table?.name}</div>;
    },
  },
  {
    accessorKey: "timeSlot",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time Slot" />
    ),
    cell: ({ row }) => {
      return <div>{row.timeSlot?.name}</div>;
    },
  },
  {
    accessorKey: "guestCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Guest Count" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <Button
            onClick={() => {
              console.log("View Reservation", row);
            }}
          >
            View
          </Button>
        </div>
      );
    },
  },
];
