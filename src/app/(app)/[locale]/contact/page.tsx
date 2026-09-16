import ContactForm from "@/components/ContactForm/ContactForm";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localeAlternates } from '@/lib/seo'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: tMeta('contactTitle'),
    description: tMeta('contactDescription'),
    alternates: localeAlternates(locale, '/contact'),
    openGraph: {
      title: tMeta('contactTitle'),
      description: tMeta('contactDescription'),
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: tMeta('contactTitle'),
      description: tMeta('contactDescription'),
    },
  };
}

export default async function Contact(
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Contact');
  return (
    <>
      <section className="p-8 lg:p-24 mt-20 mb-11 max-w-1200 mx-auto">
        <h1 className="font-suisse font-medium text-7xl">{t('interestedInWorking')}</h1>
        <p className="font-piazzolla text-4xl mt-8">{t('cta')}</p>
      </section>
      <ContactForm title="workTogether" />
    </>
  );
}
