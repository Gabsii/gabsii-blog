import Image from "next/image";
import { getTranslations } from "next-intl/server";
import scroll from '~/img/scroll.svg'


// TODO: figure out how to invert
export default async function ScrollIndicator() {
  const t = await getTranslations('General');

  return (
    <a
      className={`
        fixed bottom-8 right-8 w-24 h-24 rounded-full
        hidden lg:flex items-center justify-center
        transition-all duration-300 ease-in-out
        invert
        motion-safe:hover:scale-125
      `}
      href="#slider"
      aria-label={t('scrollToWork')}
    >
      <Image className={`
        w-full h-full relative motion-safe:animate-rotate-slow
        motion-safe:hover:animate-rotate-fast motion-safe:hover:scale-105
      `} src={scroll} alt="" />
    </a>
  )
}
