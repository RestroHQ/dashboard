"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/reusable/data-table-column-header";

export const columns = [
  {
    accessorKey: "table",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Table" />
    ),
    cell: ({ row }) => {
      return <div>{row.original.table?.name}</div>;
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      return <div>{row.original.customer?.name}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {new Date(row.original.timeSlot?.startTime).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {new Date(row.original.timeSlot?.startTime).toLocaleTimeString()}
        </div>
      );
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
