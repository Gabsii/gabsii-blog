import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";

import "./globals.css";

import Sidebar from '@/components/Sidebar/Sidebar'

import { ThemeProvider } from "~/util/context/ThemeContext";
import { piazzolla, suisseIntl } from "~/util/fonts/fonts";
import Footer from "@/components/Footer/Footer";

// TODO
export const metadata: Metadata = {
  title: "Gabsii",
  description: "Yo this is my portfolio y'all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-primary text-secondary ${piazzolla.variable} ${suisseIntl.variable}`}>
        <BackgroundColumns />
        <ThemeProvider>
          <MotionConfig reducedMotion="user">
            <Sidebar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}

const BackgroundColumns = () => (
  <div className="fixed top-0 bottom-0 left-0 z-0 pointer-events-none w-full">
    <div className="relative max-w-1200 mx-auto h-full grid grid-cols-4">
      <div className="relative before:absolute before:top-0
          before:backdrop-invert z-[100]
          before:bottom-0 before:left-0 before:-z-10
          before:block before:w-px before:origin-top
          before:bg-secondary before:opacity-10" />
      <div className="relative before:absolute before:top-0
          before:backdrop-invert z-[100]
          before:bottom-0 before:left-0 before:-z-10
          before:block before:w-px before:origin-top
          before:bg-secondary before:opacity-10" />
      <div className="relative before:absolute before:top-0
          before:backdrop-invert z-[100]
          before:bottom-0 before:left-0 before:-z-10
          before:block before:w-px before:origin-top
          before:bg-secondary before:opacity-10" />
      <div className="relative before:absolute before:top-0
          before:backdrop-invert z-[100]
          before:bottom-0 before:left-0 before:-z-10
          before:block before:w-px before:origin-top
          before:bg-secondary before:opacity-10
          after:absolute after:top-0 after:bottom-0
          after:right-0 after:-z-10 after:block after:w-px
          after:origin-top after:bg-secondary after:opacity-10" />
    </div>
  </div>
)
