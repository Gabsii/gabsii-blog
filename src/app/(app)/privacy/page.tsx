import * as m from '@/paraglide/messages'

const Privacy = () => {
  return (
    <article className="p-8 lg:p-24 relative min-h-screen">
      <section className="max-w-1200 mx-auto w-full content">
        <div dangerouslySetInnerHTML={{ __html: m.privacy() }} />
      </section>
    </article>
  );
};

export default Privacy;
