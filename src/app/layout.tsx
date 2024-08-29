import "~/styles/globals.css";
import NextTopLoader from "nextjs-toploader";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "sonner";
import SessionWrapper from "./_components/session-wrapper";

export const metadata = {
  title: "Serentiy | Minimalist Software Accounting App",
  description: "A simple and minimalist Saas like, for accounting management",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body>
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster richColors />
              <NextTopLoader color="#ef4444" />
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
