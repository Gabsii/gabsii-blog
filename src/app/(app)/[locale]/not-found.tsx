import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { Link } from "@/i18n/navigation";
import Button from "@/components/Atoms/Button";

// This is a server component so the export below is actually applied — as a
// "use client" file the noindex was silently ignored.
export const metadata: Metadata = {
  title: "404 - Page Not Found | Gabsii",
  description: "The page you are looking for could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <section className="p-8 lg:p-24 relative h-screen">
      <div className="max-w-1200 mx-auto w-full flex flex-col">
        <h1 className="font-piazzolla text-7xl mb-4">{t('title')}</h1>
        <p className="text-4xl pb-8">{t('body')}</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/"><Button as="span" isInverted>{t('home')}</Button></Link>
          <Link href="/#slider"><Button as="span">{t('work')}</Button></Link>
        </div>
      </div>
    </section>
  )
}
