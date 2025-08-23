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
  title: "Cash Back Referrals - Premium Referral Codes That Pay You Back",
  description: "Turn every click into cold hard cash with our curated collection of premium referral codes. Get cashback on finance, tech, travel, food, and more. 100% free access to exclusive deals.",
  keywords: "cash back referrals, referral codes, cashback deals, discount codes, premium referrals, money saving codes, finance referrals, tech deals, travel discounts, food vouchers, exclusive offers, savings platform, coupon codes, promotional codes, affiliate marketing, reward programs, cash rewards, discount platform, deals aggregator",
  authors: [{ name: "_kud" }],
  creator: "_kud",
  publisher: "_kud",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://referrals.kud.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cash Back Referrals - Premium Referral Codes That Pay You Back",
    description: "Turn every click into cold hard cash with our curated collection of premium referral codes. Get cashback on finance, tech, travel, food, and more.",
    url: "https://referrals.kud.io/",
    siteName: "Cash Back Referrals",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Cash Back Referrals Platform - Premium referral codes for finance, tech, travel, and more"
      }
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cash Back Referrals - Premium Referral Codes That Pay You Back",
    description: "Turn every click into cold hard cash with our curated collection of premium referral codes. Get cashback on finance, tech, travel, food, and more.",
    images: ["/preview.jpg"],
    creator: "@_kud",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
