import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import "./globals.css";

import Sidebar from '@/components/Sidebar/Sidebar'
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/Toast/Toaster";
import { PostHogProvider } from "@/components/PostHogProvider";
import { MotionWrapper } from "@/components/MotionWrapper";
import { JsonLd } from "@/components/JsonLd";

import { ThemeProvider } from "~/util/context/ThemeContext";
import { piazzolla, suisseIntl } from "~/util/fonts/fonts";
import { NextIntlClientProvider } from "next-intl";
import { localeAlternates, localePath } from '@/lib/seo'
import { routing } from '@/i18n/routing'

/** og:locale needs a territory, which the bare next-intl locale codes don't carry. */
const OG_LOCALES: Record<string, string> = { en: 'en_US', de: 'de_AT' };

// Without this the locale segment has no known values, so every route below it
// stays dynamic no matter what `setRequestLocale` says.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });

  const url = `https://gabsii.com${localePath(locale, '')}`;
  const otherLocales = routing.locales.filter((l) => l !== locale);

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL("https://gabsii.com"),
    alternates: localeAlternates(locale, ''),
    manifest: "/manifest.json",
    authors: [{name: "Lukas Gabsi"}],
    robots: {
      index: true,
      follow: true,
    },
    // Open Graph
    openGraph: {
      type: 'website',
      title: t('title'),
      description: t('description'),
      siteName: 'Gabsii',
      locale: t('ogLocale'),
      alternateLocale: otherLocales.map((l) => OG_LOCALES[l]),
      url,
    },
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('shortDescription'),
      creator: '@G4bsi',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Paths containing a dot skip the next-intl middleware (see its matcher), so an
  // unrouted path like `/rss.xml` reaches this layout with `locale` set to the filename.
  // `i18n/request.ts` then quietly falls back to the default locale, which would render
  // the homepage with a 200. Reject anything that is not a real locale instead.
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opts the whole tree into static rendering; without it every route is dynamic.
  setRequestLocale(locale);

  const messages = await getMessages();

  const t = await getTranslations({ locale, namespace: 'General' });

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Runs before first paint so the theme is never corrected after hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t;}catch(e){}})();`,
          }}
        />
        <JsonLd />
      </head>
      <body
        className={`bg-primary text-secondary ${piazzolla.variable} ${suisseIntl.variable}`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:top-2 focus:left-2 focus:bg-primary focus:text-secondary focus:px-4 focus:py-2 focus:border-2 focus:border-secondary"
        >
          {t('skipToContent')}
        </a>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <PostHogProvider>
            <ThemeProvider>
              <Sidebar />
              <BackgroundColumns />
              <MotionWrapper>
                <div className="relative min-h-screen lg:ml-12.5">
                  <main id="main" className="relative z-10 min-h-screen">
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
