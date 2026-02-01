import { Suspense } from "react";

import ContactForm from "@/components/ContactForm/ContactForm";
import { VelocityScroll } from "@/components/Marquee/Marquee";
import NewsOverview from "@/components/NewsOverview/NewsOverview";
import ProjectSlider from "@/components/ProjectSlider/ProjectSlider";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";

import HoverablePopoverEmoji from "@/app/(app)/[locale]/components/HoverablePopupEmoji";
import TimeDisplay from "@/components/TimeDisplay/TimeDisplay";

import { getCachedGlobal } from "@/lib/globals";
import { getLocale, getTranslations } from "next-intl/server";
import { TypedLocale } from "payload";

// Loading fallbacks for Suspense boundaries
const ProjectSliderFallback = () => (
  <section className="bg-secondary text-primary h-screen flex items-center justify-center">
    <div className="animate-pulse font-piazzolla text-2xl">Loading projects...</div>
  </section>
);

const ContactFormFallback = () => (
  <section className="min-h-[500px] flex items-center justify-center">
    <div className="animate-pulse font-piazzolla text-2xl">Loading contact form...</div>
  </section>
);

export default async function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<ProjectSliderFallback />}>
        <ProjectSlider />
      </Suspense>
      {/* <Services /> */}
      <Suspense fallback={<div>Loading news...</div>}>
        <NewsOverview />
      </Suspense>
      <Suspense fallback={<ContactFormFallback />}>
        <ContactForm />
      </Suspense>
    </>
  );
}

const Hero = async () => {
  // Parallelize independent async calls
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('Hero')
  ]);

  let availability = '';
  let availabilityIcon = '';

  try {
    const homepageSettings = await getCachedGlobal('homepage-settings', 1, locale as TypedLocale)();
    availability = homepageSettings.availability ?? '';
    availabilityIcon = homepageSettings.availabilityIcon ?? '';
  } catch (error) {
    console.error('[Hero] Failed to fetch homepage-settings:', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      locale,
    });
    // Continue rendering with empty values
  }

  return (
  <section className="relative h-screen">
    {/* SEO: Visually hidden H1 for accessibility and search engines */}
    <h1 className="sr-only">Gabsii - Creative Freelance Developer building memorable and performant virtual experiences</h1>
    <div className="absolute top-8 right-8 lg:right-24">
      <TimeDisplay />
    </div>
    <div className="max-w-1200 mx-auto w-full h-full grid grid-cols-4 gap-px py-8 lg:py-24">
      <div className="col-span-full flex flex-col font-suisse font-medium">
        <VelocityScroll default_velocity={10} text="Gabsii" className="text-5xl lg:text-9xl" />
        <div className="mt-20 lg:mt-[10vh] font-piazzolla font-light text-2xl lg:text-5xl leading-normal lg:leading-normal col-span-2 col-start-2 flex flex-col items-center text-center">
          <div>
            {t('isA')}<HoverablePopoverEmoji text={t('creativeFreelanceDeveloper')} popoverEmoji="👨‍💻" />
            <br />{t('building')}<HoverablePopoverEmoji text={t('memorable')} popoverEmoji="🧠" /> {t('and')} <HoverablePopoverEmoji text={t('performant')} popoverEmoji="🚀" />
            <p className="mx-auto w-max font-medium">✨ {t('virtualExperiences')} ✨</p>
          </div>
          <span className="mt-2 font-light text-xl">{t('availability')}<span className="mr-2">{availabilityIcon}</span>{availability}</span>
        </div>
      </div>
      <ScrollIndicator />
    </div>
  </section>
)}
