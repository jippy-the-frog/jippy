import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import AppLayout from "@/components/layout/app-layout";
import { cn } from "@/lib/utils";
import { StoreProvider } from "@/store/store-provider";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  // TODO: change these
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "CS3216 Assignment 3 (Group 4) - placeholder",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-text",
          fontSans.variable,
        )}
      >
        <StoreProvider>
          <AppLayout>{children}</AppLayout>
        </StoreProvider>
      </body>
    </html>
  );
}
