"use client";

import { useState } from "react";
import { Invoice } from "./_components/modules/invoice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Order } from "./_components/modules/order";
import { Return } from "./_components/modules/return";
import { SalesHeader } from "./_components/sales-header";

export function SalesClient() {
  const [tab, setTab] = useState("invoice");

  const onTabChange = (value: string) => {
    setTab(value);
  };

  return (
    <div className="mx-6 flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue={tab} onValueChange={onTabChange}>
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="invoice">Invoice</TabsTrigger>
              <TabsTrigger value="order">Order</TabsTrigger>
              <TabsTrigger value="return">Return</TabsTrigger>
            </TabsList>
            <SalesHeader currentTab={tab} />
          </div>
          <TabsContent value="invoice">
            <Invoice />
          </TabsContent>
          <TabsContent value="order">
            <Order />
          </TabsContent>
          <TabsContent value="return">
            <Return />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
