"use client"

import { useTranslations } from "next-intl";

import { usePathname, useRouter } from "~/src/i18n/navigation";
import { MotionButton } from "./animations"

// https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/components/LocaleSwitcherSelect.tsx
export const LanguageSwitcher = ({ currentLocale }: { currentLocale: string | 'de' | 'en' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('General');
  const target = currentLocale === 'en' ? 'de' : 'en';

  return (
    <MotionButton
      onClick={() => { router.push(pathname, { locale: target })}}
      aria-label={target === 'de' ? t('switchToGerman') : t('switchToEnglish')}
      isInverted
    >
      {/* `lang` stops screen readers reading "DE" in the current language's phonetics */}
      <span lang={target} aria-hidden="true">{target.toUpperCase()}</span>
    </MotionButton>
    )
}
