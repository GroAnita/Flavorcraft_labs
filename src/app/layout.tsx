import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import "./globals.css";
import AnalyticsManager from "./components/analytics/AnalyticsManager";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-next",
});

export const metadata: Metadata = {
  title: {
    default: "FlavorCraft Labs | Discover Delicious Recipes",
    template: "%s | FlavorCraft Labs",
  },
  description:
    "Discover delicious recipes, explore meal ideas, and save your favorites with FlavorCraft Labs.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://use.typekit.net/xnz3twu.css" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        <AnalyticsManager />
      </body>
    </html>
  );
}
