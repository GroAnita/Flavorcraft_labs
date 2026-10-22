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
  metadataBase: new URL("https://flavorcraftlabs.netlify.app"),
  openGraph: {
    siteName: "FlavorCraft Labs",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/categories/dessert.jpg",
        width: 1843,
        height: 1230,
        alt: "Chocolate lava cake with vanilla ice cream and chocolate sauce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  title: {
    default: "FlavorCraft Labs | Discover Delicious Recipes",
    template: "%s | FlavorCraft Labs",
  },
  description:
    "Discover delicious recipes, explore meal ideas, and save your favorites with FlavorCraft Labs.",
  // favicon.ico in this folder is linked automatically; these add sharper PNGs and the iOS icon
  icons: {
    icon: [
      {
        url: "/images/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/images/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: { url: "/images/favicon/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        {/* The Typekit stylesheet @imports p.typekit.net, so connect early */}
        <link rel="preconnect" href="https://p.typekit.net" />
        <link rel="stylesheet" href="https://use.typekit.net/xnz3twu.css" />
      </head>
      <body className="min-h-svh flex flex-col">
        <Header />
        {children}
        <Footer />
        <AnalyticsManager />
      </body>
    </html>
  );
}
