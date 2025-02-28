import * as z from "zod";

import { validateEmail, validatePassword } from "../common.schema";

export const LoginSchema = z.object({
  email: validateEmail,
  password: validatePassword,
});
export const OnboardingSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  gender: z.enum(["male", "female", "other"]),
  phone_no: z.string(),
  city: z.string(),
  country: z.string(),
  is_onboarded: z.boolean().default(true),
});
