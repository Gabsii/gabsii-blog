"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import z from "zod";
import Button from "../Atoms/Button";
import Input from "../Atoms/Input";
import Textarea from "../Atoms/Textarea";

type FormFields = z.infer<typeof schema>;

const schema = z.object({
  name: z.string({ required_error: "Please let us know how we should call you" }).trim(),
  email: z.string({ required_error: "How should I contact you without an email?" }).email().trim(),
  message: z.string({ required_error: "You already made it so far! What's your message for me?" }).trim(),
  terms: z.boolean({ required_error: "Sorry, GDPR has my hands tied here. Please just accept the terms" }),
}).required();

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
    alert(data.toString())
    return data;
  }

  return (
    <section className="bg-secondary text-primary snap-center" id="contact">
      <div className="max-w-1200 mx-auto">
        <h2 className="text-9xl pb-8 font-medium">Say Hello</h2>
      </div>
      <hr className="border border-primary" />
      <form className="
          max-w-1200 mx-auto p-24
          grid grid-cols-4 gap-12 relative
        "
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
        <div className="col-span-3">
          <Input label="I accept the processing of my data" type="checkbox" {...register("terms")} required />
          {errors.terms && <span className="text-sm text-red font-suisse font-light">{errors.terms?.message}</span>}
        </div>
        <Button type="submit" disabled={isSubmitting} className="ml-auto">
          {isSubmitting ? '🤔' : 'Hello'}
        </Button>
        {errors.root && <span className="text-sm text-red font-suisse font-light col-span-full">{errors.root?.message}</span>}
      </form>
    </section>
  )
}
