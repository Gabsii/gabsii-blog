import { z } from "zod";

type Translator = (key: string) => string;

/**
 * The form runs with `noValidate`, so these messages are what the user actually
 * reads — they have to come from the message catalogue rather than Zod's
 * English defaults.
 */
export const makeFormFieldsSchema = (t: Translator) => z.object({
  name: z.string({ required_error: t('nameError') }).trim().min(1, t('nameError')),
  email: z.string({ required_error: t('emailError') }).trim().email(t('emailError')),
  message: z.string({ required_error: t('messageError') }).trim().min(1, t('messageError')),
  // `z.boolean()` accepts `false`, so an unchecked consent box validated cleanly
  // on both the client and the submit route.
  terms: z.literal(true, { errorMap: () => ({ message: t('termsError') }) }),
}).required();

/** Server-side guard. Messages are never shown to a user, so they stay untranslated. */
export const FormFieldsSchema = makeFormFieldsSchema((key) => key);

export type FormFields = z.infer<typeof FormFieldsSchema>;
