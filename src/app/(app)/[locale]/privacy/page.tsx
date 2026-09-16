import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import EmailTrackingWrapper from "@/components/EmailTrackingWrapper";
import { localeAlternates } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: tMeta('privacyTitle'),
    description: tMeta('privacyDescription'),
    alternates: localeAlternates(locale, '/privacy'),
    robots: {
      index: true,
      follow: true,
    },
  };
}

const Privacy = async (
  { params }: { params: Promise<{ locale: string }> },
) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Privacy');
  return (
    <article className="p-8 lg:p-24 relative min-h-screen">
      <EmailTrackingWrapper location="privacy" className="max-w-1200 mx-auto w-full content">
        <div dangerouslySetInnerHTML={{ __html: t.raw('html') }} />
      </EmailTrackingWrapper>
    </article>
  );
};

export default Privacy;
