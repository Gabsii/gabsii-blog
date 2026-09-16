'use client';

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import Button from "~/src/components/Atoms/Button";


const HeroButton = ({ url }: { url: string | null | undefined }) => {
  const t = useTranslations('General');

  if (!url) return null;

  return (
    <Link href={url} className="mt-8 ml-auto w-fit flex">
      <Button as="span" isInverted>
        {t('visit')} →
      </Button>
    </Link>
  )
}

export default HeroButton;
