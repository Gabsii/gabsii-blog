"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "../Atoms/Button";

function Captcha({
  solveCaptcha,
  onCancel,
}: {
  solveCaptcha: (solved: boolean) => void;
  onCancel: () => void;
}) {
  const [isSolved, setIsSolved] = useState(false);
  const t = useTranslations('ContactForm');

  const handleSolve = () => {
    setIsSolved(true);
    solveCaptcha(true);
  };

  return (
    <div className="bg-primary text-secondary p-8 shadow-lg flex flex-col items-center gap-4">
      <p id="captcha-title" className="text-center">{t('verifyHuman')}</p>
      <Button onClick={handleSolve} disabled={isSolved} isInverted>
        {isSolved ? t('verified') : t('notARobot')}
      </Button>
      <button
        type="button"
        onClick={onCancel}
        className="text-sm underline underline-offset-4 p-2"
      >
        {t('cancelVerification')}
      </button>
    </div>
  );
}

export default Captcha;
