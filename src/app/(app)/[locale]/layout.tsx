import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getLocale, getMessages } from "next-intl/server";

import "./globals.css";

import Sidebar from '@/components/Sidebar/Sidebar'
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/Toast/Toaster";
import { PostHogProvider } from "@/components/PostHogProvider";

import { ThemeProvider } from "~/util/context/ThemeContext";
import { piazzolla, suisseIntl } from "~/util/fonts/fonts";
import { NextIntlClientProvider } from "~/src/lib/ctx/NextIntlClientProvider";

// TODO: localized?
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
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <html lang={locale}>
        <body className={`bg-primary text-secondary ${piazzolla.variable} ${suisseIntl.variable}`}>
          <PostHogProvider>
            <BackgroundColumns />
            <ThemeProvider>
              <MotionConfig reducedMotion="user">
                <Sidebar />
                <main className="min-h-screen lg:w-[calc(100vw-50px)] lg:ml-[50px]">
                  {children}
                </main>
                <Toaster />
                <Footer />
              </MotionConfig>
            </ThemeProvider>
            <SpeedInsights />
          </PostHogProvider>
        </body>
      </html>
      </NextIntlClientProvider>
  );
}

const BackgroundColumns = () => (
  <div className="fixed lg:w-[calc(100vw-50px)] lg:ml-[50px] top-0 bottom-0 left-0 z-0 pointer-events-none w-full">
    <div className="relative max-w-1200 mx-auto h-full grid grid-cols-4">
      <div className="relative before:absolute before:top-0
          before:backdrop-invert z-100
          before:bottom-0 before:left-0 before:-z-10
          before:block before:w-px before:origin-top
          before:bg-secondary before:opacity-10" />
      <div className="relative before:absolute before:top-0
          before:backdrop-invert z-100
          before:bottom-0 before:left-0 before:-z-10
          before:block before:w-px before:origin-top
          before:bg-secondary before:opacity-10" />
      <div className="relative before:absolute before:top-0
          before:backdrop-invert z-100
          before:bottom-0 before:left-0 before:-z-10
          before:block before:w-px before:origin-top
          before:bg-secondary before:opacity-10" />
      <div className="relative before:absolute before:top-0
          before:backdrop-invert z-100
          before:bottom-0 before:left-0 before:-z-10
          before:block before:w-px before:origin-top
          before:bg-secondary before:opacity-10
          after:backdrop-invert
          after:absolute after:top-0 after:bottom-0
          after:right-0 after:-z-10 after:block after:w-px
          after:origin-top after:bg-secondary after:opacity-10" />
    </div>
  </div>
);
