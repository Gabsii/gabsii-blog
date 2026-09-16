import ContactForm from "@/components/ContactForm/ContactForm";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localeAlternates } from '@/lib/seo'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Contact - Let's Work Together | Gabsii",
    description: "Get in touch with Gabsii for web development projects, collaborations, or just to say hello. Austria-based freelancer specializing in full-stack development.",
    alternates: localeAlternates(locale, '/contact'),
    openGraph: {
      title: "Contact - Let's Work Together | Gabsii",
      description: "Get in touch with Gabsii for web development projects, collaborations, or just to say hello.",
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: "Contact - Let's Work Together | Gabsii",
      description: "Get in touch with Gabsii for web development projects and collaborations.",
    },
  };
}

export default async function Contact() {
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
