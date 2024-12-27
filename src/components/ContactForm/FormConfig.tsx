import { z } from "zod";

import * as m from "@/paraglide/messages.js"

export type FormFields = z.infer<typeof FormFieldsSchema>;

export const FormFieldsSchema = z.object({
  name: z.string({ required_error: m.nameError() }).trim(),
  email: z.string({ required_error: m.emailError() }).email().trim(),
  message: z.string({ required_error: m.messageError() }).trim(),
  terms: z.boolean({ required_error: m.termsError() }),
}).required();
