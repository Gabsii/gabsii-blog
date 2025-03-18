import * as m from '@/paraglide/messages'

const Imprint = () => {
  return (
    <article className="p-8 lg:p-24 relative min-h-screen">
      <section className="max-w-1200 mx-auto w-full content">
        <h1 dangerouslySetInnerHTML={{ __html: m.impressum_title() }} />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_intro() }} />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_companyName() }} />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_address() }} />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_contact() }} />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_companyDetails() }} />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_supervisory() }} />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_professional() }} />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_management() }} />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_dataprotection() }} />
        <h2
          id="eu-streitschlichtung"
          dangerouslySetInnerHTML={{ __html: m.impressum_euDisputeTitle() }}
        />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_euDisputeContent() }} />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_euDisputeNotice() }} />
        <h2
          id="onlineauftritte"
          dangerouslySetInnerHTML={{ __html: m.impressum_additionalOnlineTitle() }}
        />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_additionalOnlineContent() }} />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_copyright() }} />
        <p dangerouslySetInnerHTML={{ __html: m.impressum_source() }} />

      </section>
    </article>
  );
};

export default Imprint;
