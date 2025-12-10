import ContactForm from "@/components/ContactForm/ContactForm";
import { VelocityScroll } from "@/components/Marquee/Marquee";
// import NewsOverview from "@/components/NewsOverview/NewsOverview";
import ProjectSlider from "@/components/ProjectSlider/ProjectSlider";
import ScrollIndicator from "@/components/ScrollIndicator/ScrollIndicator";

import HoverablePopoverEmoji from "@/app/(app)/[locale]/components/HoverablePopupEmoji";
import TimeDisplay from "@/components/TimeDisplay/TimeDisplay";

import { getCachedGlobal } from "@/lib/globals";
import { getLocale, getTranslations } from "next-intl/server";
import { TypedLocale } from "payload";

export default async function Home() {
  return (
    <>
      <Hero />
      <ProjectSlider />
      {/* <Services /> */}
      {/* <NewsOverview /> */}
      <ContactForm />
    </>
  );
}

const Hero = async () => {
  const locale = await getLocale();
  const { availability, availabilityIcon} = await getCachedGlobal('homepage-settings', 1, locale as TypedLocale)()
  const t = await getTranslations('Hero');

  return (
  <section className="p-8 lg:p-24 relative h-screen">
    <div className="absolute top-8 right-8">
      <TimeDisplay />
    </div>
    <div className="max-w-1200 mx-auto w-full grid grid-cols-4 gap-px">
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
