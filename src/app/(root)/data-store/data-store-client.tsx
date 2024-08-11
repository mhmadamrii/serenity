"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DataStoreHeader } from "./_components/data-store-header";
import { Customers } from "./_components/parts/customers";

interface IProps {
  customers: ICustomers[];
}

interface ICustomers {
  id: number;
  name: string;
  address: string;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function DataStoreClient({ customers }: IProps) {
  console.log("customers", customers);
  const [tab, setTab] = useState("customers");

  const onTabChange = (value: string) => {
    setTab(value);
  };

  return (
    <div className="mx-6 flex flex-col sm:gap-4 sm:py-4">
      <main className="grid flex-1 items-start gap-4  p-4 sm:px-6 sm:py-0 md:gap-8">
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
            <Customers customers={customers} />
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
