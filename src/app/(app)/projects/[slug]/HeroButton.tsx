'use client';

import { Link } from "@/lib/i18n";
import Button from "~/src/components/Atoms/Button";


const HeroButton = ({ url }: { url: string | null | undefined }) => {
  if (!url) return null;

  return (
    <Link href={url} className="text-primary mt-8 ml-auto w-fit flex">
      <Button isInverted>Visit →</Button>
    </Link>
  )
}

export default HeroButton;
