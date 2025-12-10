import ContactForm from "@/components/ContactForm/ContactForm";
import { getTranslations } from "next-intl/server";

export default async function Contact() {
  const t = await getTranslations('Contact');
  return (
    <>
      <section className="p-8 lg:p-24 mt-20 mb-11 max-w-1200 mx-auto">
        <h1 className="font-suisse font-medium text-7xl">{t('interestedInWorking')}</h1>
        <p className="font-piazzolla text-4xl mt-8">{t('cta')}</p>
      </section>
      <ContactForm title="Let's work together" />
    </>
  );
}
