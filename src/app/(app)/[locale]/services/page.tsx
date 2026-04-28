import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Section from '@/components/Atoms/Section'
import Button from '@/components/Atoms/Button'
import ServicesAccordion from './ServicesAccordion'
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Built to Last',
  description:
    'Web development, creative direction, and freelance consulting from Gabsii — Austria-based full-stack developer building performant, memorable digital experiences.',
  alternates: {
    canonical: '/services',
    languages: {
      en: '/services',
      de: '/de/services',
    },
  },
  openGraph: {
    title: 'Built to Last | Gabsii',
    description:
      'Web development, creative direction, and freelance consulting from Gabsii.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Built to Last | Gabsii',
    description:
      'Web development, creative direction, and freelance consulting from Gabsii.',
  },
}

export default async function Services() {
  const t = await getTranslations('Services')

  const processSteps = [
    { number: '01', title: t('step1Title'), description: t('step1Description') },
    { number: '02', title: t('step2Title'), description: t('step2Description') },
    { number: '03', title: t('step3Title'), description: t('step3Description') },
    { number: '04', title: t('step4Title'), description: t('step4Description') },
  ]

  const services = [
    {
      name: t('service1Title'),
      description: t('service1Description'),
      serviceType: 'Web Development',
    },
    {
      name: t('service2Title'),
      description: t('service2Description'),
      serviceType: 'Creative Direction',
    },
    {
      name: t('service3Title'),
      description: t('service3Description'),
      serviceType: 'Consulting',
    },
  ]

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://gabsii.com' },
        { name: 'Services', url: 'https://gabsii.com/services' },
      ]} />
      <ServiceJsonLd services={services} />
      {/* Hero */}
      <Section className="mt-20 lg:mt-0 pt-16 lg:pt-32 pb-8 lg:pb-16">
        <p className="font-suisse font-medium text-sm uppercase tracking-widest text-grey mb-6">
          {t('heroEyebrow')}
        </p>
        <h1 className="font-piazzolla font-light text-7xl lg:text-9xl leading-none mb-8">
          {t('heroHeadline')}
        </h1>
        <p className="font-suisse font-light text-xl lg:text-2xl max-w-2xl leading-relaxed">
          {t('heroSubheadline')}
        </p>
      </Section>

      {/* Services Accordion */}
      <Section className="pt-0 lg:pt-0 pb-16 lg:pb-24">
        <h2 className="font-suisse font-medium text-sm uppercase tracking-widest text-grey mb-8">
          {t('servicesLabel')}
        </h2>
        <ServicesAccordion />
      </Section>

      {/* Process */}
      <section className="bg-secondary text-primary">
        <Section as="div" className="py-16 lg:py-24">
          <h2 className="font-piazzolla font-light text-5xl lg:text-7xl mb-16 lg:mb-24">
            {t('processHeadline')}
          </h2>
          <ol className="grid grid-cols-1 lg:grid-cols-4 gap-px border border-secondary/20">
            {processSteps.map((step) => (
              <li
                key={step.number}
                className="border border-primary/10 p-8 lg:p-10 flex flex-col gap-4"
              >
                <span className="font-piazzolla font-light text-5xl lg:text-7xl text-primary/30">
                  {step.number}
                </span>
                <hr className="border-primary/20" />
                <h3 className="font-suisse font-medium text-xl uppercase tracking-widest">
                  {step.title}
                </h3>
                <p className="font-suisse font-light text-sm leading-relaxed text-primary/70">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      </section>

      {/* Testimonial */}
      <Section className="py-16 lg:py-32">
        <div className="max-w-4xl">
          <span className="font-suisse font-medium text-sm uppercase tracking-widest text-grey block mb-10">
            {t('testimonialLabel')}
          </span>
          <blockquote className="font-piazzolla font-light italic text-3xl lg:text-5xl leading-snug mb-10">
            &ldquo;{t('testimonialQuote')}&rdquo;
          </blockquote>
          <cite className="not-italic flex items-center gap-4">
            <span className="inline-block w-8 h-px bg-secondary" />
            <span className="font-suisse font-medium text-sm uppercase tracking-widest">
              {t('testimonialAuthor')}
            </span>
          </cite>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-secondary text-primary">
        <Section as="div" className="py-16 lg:py-32 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div>
            <h2 className="font-piazzolla font-light text-5xl lg:text-8xl leading-none mb-6">
              {t('ctaHeadline')}
            </h2>
            <p className="font-suisse font-light text-lg text-primary/70 max-w-xl leading-relaxed">
              {t('ctaSubheadline')}
            </p>
          </div>
          <div className="shrink-0 w-full lg:w-64">
            <Link href="/contact">
              <Button isInverted>
                {t('ctaButton')} →
              </Button>
            </Link>
          </div>
        </Section>
      </section>
    </>
  )
}
