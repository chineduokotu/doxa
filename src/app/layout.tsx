import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Doxa Home — Premium Furniture, Benin City",
    template: "%s | Doxa Home",
  },
  description:
    "Premium furniture for discerning Nigerian homes. Shop luxury sofas, dining sets, royal collections and more from our showroom at 108 Akpakpava Road, Benin City.",
  keywords: [
    "luxury furniture Nigeria",
    "premium furniture Benin City",
    "furniture store Nigeria",
    "luxury sofa Nigeria",
    "dining table set Nigeria",
    "interior design furniture Nigeria",
  ],
  openGraph: {
    title: "Doxa Home — Premium Furniture",
    description:
      "Curating premium furniture for discerning homes across Nigeria.",
    siteName: "Doxa Home",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Doxa Home — Premium Furniture",
    description: "Premium furniture for discerning Nigerian homes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <CookieBanner />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
