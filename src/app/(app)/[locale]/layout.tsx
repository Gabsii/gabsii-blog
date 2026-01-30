import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getLocale, getMessages } from "next-intl/server";

import "./globals.css";

import Sidebar from '@/components/Sidebar/Sidebar'
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/Toast/Toaster";
import { PostHogProvider } from "@/components/PostHogProvider";
import { MotionWrapper } from "@/components/MotionWrapper";
import { JsonLd } from "@/components/JsonLd";

import { ThemeProvider } from "~/util/context/ThemeContext";
import { piazzolla, suisseIntl } from "~/util/fonts/fonts";
import { NextIntlClientProvider } from "~/src/lib/ctx/NextIntlClientProvider";

export const metadata: Metadata = {
  title: "Gabsii - Digital Innovation & Web Solutions",
  description: "Explore my portfolio as an Austria-based freelancer specializing in advanced software development, full-stack solutions, and strategic SEO enhancements. Discover innovative digital projects that empower brands to grow—let's create something exceptional together.",
  metadataBase: new URL("https://gabsii.com"),
  alternates: {
    canonical: "/",
    languages: {
      'en': '/',
      'de': '/de',
    }
  },
  manifest: "/manifest.json",
  authors: [{name: "Lukas Gabsi"}],
  robots: {
    index: true,
    follow: true,
  },
  // Open Graph
  openGraph: {
    type: 'website',
    title: 'Gabsii - Digital Innovation & Web Solutions',
    description: 'Explore my portfolio as an Austria-based freelancer specializing in advanced software development, full-stack solutions, and strategic SEO enhancements.',
    siteName: 'Gabsii',
    locale: 'en_US',
    alternateLocale: 'de_DE',
    url: 'https://gabsii.com',
  },
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Gabsii - Digital Innovation & Web Solutions',
    description: 'Austria-based freelancer specializing in advanced software development and full-stack solutions.',
    creator: '@G4bsi',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Parallelize async calls
  const [messages, locale] = await Promise.all([
    getMessages(),
    getLocale()
  ]);

  return (
    <html lang={locale}>
      <head>
        <JsonLd />
      </head>
      <body
        className={`bg-primary text-secondary ${piazzolla.variable} ${suisseIntl.variable}`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <PostHogProvider>
            <ThemeProvider>
              <Sidebar />
              <BackgroundColumns />
              <MotionWrapper>
                <div className="relative min-h-screen lg:ml-12.5">
                  <main className="relative z-10 min-h-screen">
                    {children}
                  </main>
                  <Footer />
                  <Toaster />
                </div>
              </MotionWrapper>
            </ThemeProvider>
            <SpeedInsights />
          </PostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

const BackgroundColumns = () => (
  <div className="pointer-events-none fixed inset-0 z-0">
    {/* This padding replicates the sidebar gutter used by lg:ml-12.5 */}
    <div className="h-full lg:pl-12.5">
      {/* The grid is centered in the content area (viewport minus sidebar) */}
      <div className="relative mx-auto h-full max-w-1200 grid grid-cols-4">
        <div className="relative before:absolute before:top-0 before:bottom-0 before:left-0 before:-z-10 before:block before:w-px before:origin-top before:bg-secondary before:opacity-10" />
        <div className="relative before:absolute before:top-0 before:bottom-0 before:left-0 before:-z-10 before:block before:w-px before:origin-top before:bg-secondary before:opacity-10" />
        <div className="relative before:absolute before:top-0 before:bottom-0 before:left-0 before:-z-10 before:block before:w-px before:origin-top before:bg-secondary before:opacity-10" />
        <div className="relative before:absolute before:top-0 before:bottom-0 before:left-0 before:-z-10 before:block before:w-px before:origin-top before:bg-secondary before:opacity-10 after:absolute after:top-0 after:bottom-0 after:right-0 after:-z-10 after:block after:w-px after:origin-top after:bg-secondary after:opacity-10" />
      </div>
    </div>
  </div>
);
