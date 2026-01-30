import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Gabsii",
  description: "Privacy policy for Gabsii - Digital Innovation & Web Solutions. Learn how your data is collected, used, and protected.",
  alternates: {
    canonical: "/privacy",
    languages: {
      'en': '/privacy',
      'de': '/de/privacy',
    }
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Privacy = async () => {
  const t = await getTranslations('Privacy');
  return (
    <article className="p-8 lg:p-24 relative min-h-screen">
      <section className="max-w-1200 mx-auto w-full content">
        <div dangerouslySetInnerHTML={{ __html: t.raw('html') }} />
      </section>
    </article>
  );
};

export default Privacy;
