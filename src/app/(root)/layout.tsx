import { Navigation } from "~/components/Navigation";

export default function RootLayout({
  children,
  // modal,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: string;
}>) {
  console.log("params", params);
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
