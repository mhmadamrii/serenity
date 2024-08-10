"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DataStoreHeader } from "./_components/data-store-header";

export function DataStoreClient() {
  const [tab, setTab] = useState("customers");

  const onTabChange = (value: string) => {
    setTab(value);
  };

  return (
    <div className="mx-6 flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue={tab} onValueChange={onTabChange}>
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="taxes">Taxes</TabsTrigger>
            </TabsList>
            <DataStoreHeader currentTab={tab} />
          </div>
          <TabsContent value="customers">
            <div>customers</div>
          </TabsContent>
          <TabsContent value="products">
            <div>products</div>
          </TabsContent>
          <TabsContent value="taxes">
            <div>taxes</div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
