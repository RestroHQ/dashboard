"use client";

import Loader from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMenusQuery } from "@/hooks/use-menu";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Page({ restaurantId }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [orderItems, setOrderItems] = useState([]);
  const { toast } = useToast();

  const { data: menus, isLoading: isMenusLoading } =
    useGetMenusQuery(restaurantId);

  if (isMenusLoading) {
    return <Loader />;
  }

  const categories = [
    { id: "all", name: "All Items" },
    { id: "appetizers", name: "Appetizers" },
    { id: "main", name: "Main Course" },
    { id: "desserts", name: "Desserts" },
    { id: "drinks", name: "Drinks" },
  ];

  const menuItems = [
    { id: "1", name: "Caesar Salad", price: 12.99, categoryId: "appetizers" },
    { id: "2", name: "Steak", price: 29.99, categoryId: "main" },
    { id: "3", name: "Chocolate Cake", price: 8.99, categoryId: "desserts" },
    { id: "4", name: "Soda", price: 3.99, categoryId: "drinks" },
    { id: "5", name: "Chicken Wings", price: 14.99, categoryId: "appetizers" },
    { id: "6", name: "Burger", price: 19.99, categoryId: "main" },
    { id: "7", name: "Ice Cream", price: 6.99, categoryId: "desserts" },
    { id: "8", name: "Beer", price: 5.99, categoryId: "drinks" },
    { id: "9", name: "Nachos", price: 11.99, categoryId: "appetizers" },
    { id: "10", name: "Pasta", price: 17.99, categoryId: "main" },
    { id: "11", name: "Cheesecake", price: 7.99, categoryId: "desserts" },
    { id: "12", name: "Wine", price: 9.99, categoryId: "drinks" },
  ];

  const addToOrder = (item) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.menuItem.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, delta) => {
    setOrderItems((prev) =>
      prev
        .map((item) => {
          if (item.menuItem.id === itemId) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item) => item !== null),
    );
  };

  const removeItem = (itemId) => {
    setOrderItems((prev) => prev.filter((item) => item.menuItem.id !== itemId));
  };

  const total = orderItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    if (orderItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add items to the order first",
        variant: "destructive",
      });
      return;
    }

    // Implement checkout logic here
    toast({
      title: "Order Placed",
      description: `Total: $${total.toFixed(2)}`,
    });
    setOrderItems([]);
  };

  return (
    <div className="flex max-h-svh overflow-y-hidden">
      <div className="flex-1 p-6">
        <Tabs defaultValue="all" className="h-full">
          <TabsList className="mb-4">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={activeCategory} className="h-[calc(100%-60px)]">
            <div className="grid grid-cols-3 gap-4">
              {menuItems
                .filter(
                  (item) =>
                    activeCategory === "all" ||
                    item.categoryId === activeCategory,
                )
                .map((item) => (
                  <Card
                    key={item.id}
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => addToOrder(item)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        ${item.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-[400px] border-l h-svh flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold">Current Order</h2>
        </div>
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {orderItems.map((item) => (
              <Card key={item.menuItem.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">{item.menuItem.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.menuItem.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.menuItem.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.menuItem.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item.menuItem.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="text-lg font-medium">Total</span>
            <span className="text-2xl font-bold">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full" size="lg" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
