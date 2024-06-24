import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUiProvider } from "@/components/NextUiProvider";
import ReactQueryClientProvider from "@/components/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo app",
  description: "Simple todo portal with login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextUiProvider>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </NextUiProvider>
      </body>
    </html>
  );
}
