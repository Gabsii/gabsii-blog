import { z } from "zod";

export type FormFields = z.infer<typeof FormFieldsSchema>;

// TODO: refactor required_error
export const FormFieldsSchema = z.object({
  name: z.string({
    // required_error: m.nameError()
  }).trim(),
  email: z.string({
    // required_error: m.emailError()
  }).email().trim(),
  message: z.string({
    // required_error: m.messageError()
  }).trim(),
  terms: z.boolean({
    // required_error: m.termsError()
  }),
}).required();
