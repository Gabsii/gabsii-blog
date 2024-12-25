"use client";

// import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import Button from "../Atoms/Button";
import Input from "../Atoms/Input";
import Textarea from "../Atoms/Textarea";

import { useToast } from "~/util/hooks/use-toast";
import Section from "../Atoms/Section";
import { FormFields, FormFieldsSchema } from "./FormConfig";

export default function ContactForm({ title = 'Say Hello' }: { title?: string }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormFields>({
    resolver: zodResolver(FormFieldsSchema)
  });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    const res = await fetch("/contact/submit", {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(data)
    })

    if (res.status !== 201) {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "error"
      })
      return;
    }

    toast({
      title: "Sucess!",
    })
    reset();
  }

  return (
    <section className="bg-secondary text-primary snap-center" id="contact">
      <div className="max-w-1200 mx-auto">
        <h2 className="px-8 lg:px-24 text-5xl lg:text-9xl py-4 lg:pb-8 font-medium">{title}</h2>
      </div>
      <hr className="border border-primary" />
      <Section as="form" className="p-8 lg:p-24 grid grid-cols-4 gap-12 relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-full xl:col-span-2">
          <Input label="Your Name" type="text" {...register("name")} required isInverted />
          {errors.name && <span className="text-sm text-red font-suisse font-light">{errors.name?.message}</span>}
        </div>
        <div className="col-span-full xl:col-span-2">
          <Input label="Your Email" type="text" {...register("email")} required isInverted />
          {errors.email && <span className="text-sm text-red font-suisse font-light">{errors.email?.message}</span>}
        </div>
        <div className="col-span-full">
          <Textarea label="Your Message" {...register("message")} required />
          {errors.message && <span className="text-sm text-red font-suisse font-light">{errors.message?.message}</span>}
        </div>
        <div className="col-span-full lg:col-span-3">
          <Input label="I accept the processing of my data" type="checkbox" {...register("terms")} required />
          {errors.terms && <span className="text-sm text-red font-suisse font-light">{errors.terms?.message}</span>}
        </div>
        <Button type="submit" disabled={isSubmitting} wrapperClassName="col-start-3 lg:col-span-1" className="ml-auto">
          {isSubmitting ? '🤔' : 'Hello'}
        </Button>
        {errors.root && <span className="text-sm text-red font-suisse font-light col-span-full">{errors.root?.message}</span>}
      </Section>
    </section>
  )
}
