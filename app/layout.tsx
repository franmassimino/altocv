import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Use font-display: swap for better performance
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["Courier New", "monospace"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "AltoCV - AI-Powered CV Builder",
    template: "%s | AltoCV",
  },
  description: "Build ATS-friendly CVs with AI assistance. Create professional resumes optimized for Applicant Tracking Systems in minutes.",
  keywords: ["CV builder", "Resume builder", "ATS friendly", "AI CV", "professional resume"],
  authors: [{ name: "AltoCV" }],
  creator: "AltoCV",
  metadataBase: new URL(process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AltoCV - AI-Powered CV Builder",
    description: "Build ATS-friendly CVs with AI assistance",
    siteName: "AltoCV",
  },
  twitter: {
    card: "summary_large_image",
    title: "AltoCV - AI-Powered CV Builder",
    description: "Build ATS-friendly CVs with AI assistance",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
