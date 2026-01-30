import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint | Gabsii",
  description: "Legal information and imprint for Gabsii - Digital Innovation & Web Solutions. Contact details, company information, and legal notices.",
  alternates: {
    canonical: "/imprint",
    languages: {
      'en': '/imprint',
      'de': '/de/imprint',
    }
  },
  robots: {
    index: true,
    follow: true,
  },
};

const Imprint = async () => {
  const t = await getTranslations('Imprint');
  return (
    <article className="p-8 lg:p-24 relative min-h-screen">
      <section className="max-w-1200 mx-auto w-full content">
        <h1 dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('intro') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('companyName') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('address') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('contact') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('companyDetails') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('supervisory') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('professional') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('management') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('dataprotection') }} />
        <h2
          id="eu-streitschlichtung"
          dangerouslySetInnerHTML={{ __html: t.raw('euDisputeTitle') }}
        />
        <p dangerouslySetInnerHTML={{ __html: t.raw('euDisputeContent') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('euDisputeNotice') }} />
        <h2
          id="onlineauftritte"
          dangerouslySetInnerHTML={{ __html: t.raw('additionalOnlineTitle') }}
        />
        <p dangerouslySetInnerHTML={{ __html: t.raw('additionalOnlineContent') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('copyright') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('source') }} />

      </section>
    </article>
  );
};

export default Imprint;
