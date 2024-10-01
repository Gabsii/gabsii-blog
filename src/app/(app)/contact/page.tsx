import ContactForm from "@/components/ContactForm/ContactForm";

export default function Contact() {
  return (
    <>
      <section className="p-8 lg:p-24 mt-20 mb-11 max-w-1200 mx-auto">
        <h1 className="font-suisse font-medium text-7xl">Interested in working together?</h1>
        <p className="font-piazzolla text-4xl mt-8">Looking to rebrand your business, just starting out, or an agency in need of
          a part-time contractor? I&apos;d love to hear more! Drop me an email,
          or fill out the form to get started!</p>
      </section>
      <ContactForm title="Let's work together" />
    </>
  );
}
