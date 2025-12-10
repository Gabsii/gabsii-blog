"use client"

import { usePathname, useRouter } from "~/src/i18n/navigation";
import { MotionButton } from "./animations"

export const LanguageSwitcher = ({ currentLocale }: { currentLocale: string | 'de' | 'en' }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <MotionButton
      onClick={() => { router.push(pathname, {locale: currentLocale == 'en' ? 'de' : 'en' })}}
      isInverted
    >
      {currentLocale == 'en' ? 'DE' : 'EN'}
    </MotionButton>
    )
}
