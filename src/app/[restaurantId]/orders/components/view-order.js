"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function ViewOrder() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          View
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-full max-w-xl">
        <div>
          <DrawerHeader>
            <DrawerTitle>Order Details</DrawerTitle>
            <DrawerDescription>View and manage order details</DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            <p className="text-sm text-gray-500">
              <strong>Order ID:</strong> #123456
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
