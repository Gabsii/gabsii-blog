"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import Button from "../Atoms/Button";
import Input from "../Atoms/Input";
import Textarea from "../Atoms/Textarea";
import Section from "../Atoms/Section";

import { useToast } from "~/util/hooks/use-toast";
import { FormFields, FormFieldsSchema } from "./FormConfig";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";
import Captcha from "./Captcha";
import { useTranslations } from "next-intl";

export default function ContactForm({ title = 'sayHello' }: { title?: string }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormFields>({
    resolver: zodResolver(FormFieldsSchema)
  });
  const { toast } = useToast();
  const postHog = usePostHog();
  const [isCaptchaEnabled, setIsCaptchaEnabled] = useState(false);
  const [isCaptchaSolved, solveCaptcha] = useState(false);
  const t = useTranslations('ContactForm');

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    // Ensure captcha overlay is shown at least once before submit
    if (!isCaptchaSolved) {
      setIsCaptchaEnabled(true);
      if (isCaptchaEnabled) {
        toast({ title: t('pleaseSolveCaptcha'), variant: "error" });
      }
      return;
    }

    setIsCaptchaEnabled(false);

    postHog.capture('contact_form_submitted', data);
    const res = await fetch("/contact/submit", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.status !== 201) {
      toast({ title: t('somethingWentWrong'), description: t('tryAgainLater'), variant: "error" });
      return;
    }

    toast({ title: t('success') });
    reset();
  }

  useEffect(() => {
    if (isCaptchaEnabled && isCaptchaSolved) {
      handleSubmit(onSubmit)();
    }
  }, [isCaptchaEnabled, isCaptchaSolved, handleSubmit]);

  return (
    <section className="bg-secondary text-primary snap-center" id="contact">
      <div className="max-w-1200 mx-auto">
        <h2 className="px-8 lg:px-24 text-5xl lg:text-9xl py-4 lg:pb-8 font-medium">{t(title)}</h2>
      </div>
      <hr className="border border-primary" />
      <Section as="form" className="p-8 lg:p-24 grid grid-cols-4 gap-12 relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-full xl:col-span-2">
          <Input label={t('yourName')} type="text" {...register("name")} required isInverted />
          {errors.name && <span className="text-sm text-red font-suisse font-light">{errors.name?.message}</span>}
        </div>
        <div className="col-span-full xl:col-span-2">
          <Input label={t('yourEmail')} type="text" {...register("email")} required isInverted />
          {errors.email && <span className="text-sm text-red font-suisse font-light">{errors.email?.message}</span>}
        </div>
        <div className="col-span-full">
          <Textarea label={t('yourMessage')} {...register("message")} required />
          {errors.message && <span className="text-sm text-red font-suisse font-light">{errors.message?.message}</span>}
        </div>
        <div className="col-span-full lg:col-span-3">
          <Input label={t('acceptTerms')} type="checkbox" {...register("terms")} required />
          {errors.terms && <span className="text-sm text-red font-suisse font-light">{errors.terms?.message}</span>}
        </div>
        {isCaptchaEnabled && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Captcha solveCaptcha={solveCaptcha} />
          </div>
        )}
        <Button type="submit" disabled={isSubmitting} wrapperClassName="col-start-3 lg:col-span-1" className="ml-auto">
          {isSubmitting ? '🤔' : t('hello')}
        </Button>
        {errors.root && <span className="text-sm text-red font-suisse font-light col-span-full">{errors.root?.message}</span>}
      </Section>
    </section>
  )
}
