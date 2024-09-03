import { BgParticlesSales } from "./bg-particles-sales";
import { SalesHeader } from "./sales-header";

export function FormInvoiceWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BgParticlesSales />
      <SalesHeader
        headerName="Create Invoice"
        type="create"
        breadcrumbItems={[
          {
            label: "Dashboard",
            path: "/dashboard",
          },
          {
            label: "Sales",
            path: "/sales",
          },
          {
            label: "Invoices",
            path: "/sales/invoice",
          },
        ]}
      />
      {children}
    </>
  );
}
