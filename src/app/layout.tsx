import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { site } from "@/lib/site"
import "./globals.css"

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: site.owner.name, url: site.owner.url }],
  creator: site.owner.name,
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: site.title,
    description: site.description,
    creator: "@_kud",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1116" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={sans.variable}
    >
      <body>{children}</body>
    </html>
  )
}
