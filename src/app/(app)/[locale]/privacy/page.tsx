import { getTranslations } from "next-intl/server";

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
