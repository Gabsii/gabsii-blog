import { z } from "zod";

export type FormFields = z.infer<typeof FormFieldsSchema>;

export const FormFieldsSchema = z.object({
  name: z.string({ required_error: "Please let us know how we should call you" }).trim(),
  email: z.string({ required_error: "How should I contact you without an email?" }).email().trim(),
  message: z.string({ required_error: "You already made it so far! What's your message for me?" }).trim(),
  terms: z.boolean({ required_error: "Sorry, GDPR has my hands tied here. Please just accept the terms" }),
}).required();
