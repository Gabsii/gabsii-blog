import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import EmailTrackingWrapper from "@/components/EmailTrackingWrapper";
import { localeAlternates } from '@/lib/seo'

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> },
): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Privacy Policy | Gabsii",
    description: "Privacy policy for Gabsii - Digital Innovation & Web Solutions. Learn how your data is collected, used, and protected.",
    alternates: localeAlternates(locale, '/privacy'),
    robots: {
      index: true,
      follow: true,
    },
  };
}

const Privacy = async () => {
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
