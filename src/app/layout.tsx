import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Get Referrals | _kud",
  description: "Get some vouchers for different platforms.",
  keywords: "referrals, discount, price, code, promo, voucher, vouchers, referral, price, groslot, reduction, prix, partnership, offer, savings, coupon, deal, special, discount code, promotional offer, cashback, loyalty, rewards, clearance, sale, limited time, exclusive, online shopping, e-commerce, savings, budget-friendly, affordable, bargain, markdown, price drop, special offer, promotional code, discount voucher",
  openGraph: {
    title: "Get Referrals | _kud",
    description: "Get some vouchers for different platforms.",
    url: "https://referrals.kud.io/",
    images: [
      {
        url: "https://referrals.kud.io/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Referrals Preview"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Referrals | _kud",
    description: "Get some vouchers for different platforms.",
    images: ["https://referrals.kud.io/preview.jpg"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
