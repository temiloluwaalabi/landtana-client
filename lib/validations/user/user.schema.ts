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
export const BiodataSchema = z.object({
  fullName: z.string(),
  dob: z.date(),
  gender: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  email: z.optional(z.string().email()),
  emergencyContact: z
    .object({
      name: z.string(),
      phoneNumber: z.string(),
      relationship: z.string(),
    })
    .optional(),
});
