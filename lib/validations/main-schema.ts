import * as z from "zod";

export const CreateServiceSchema = z.object({
  name: z.string().min(1, "Service name is required").default("Braids"),
  description: z.string().min(1, "Description is required"),
  base_price: z.string().min(1, "Price must be a positive number"),
  duration: z.string().min(1, "Duration must be at least 1 hour"),
  images: z.array(z.string().url()).optional(), // Optional array of image URLs
  category: z.enum(["BRAIDING", "TWISTS", "WEAVING"]).default("BRAIDING"),
  is_active: z.boolean().optional(), // Default is not set explicitly
  aftercare_tips: z.string().optional(), // Optional field
});
export const CreateStylistSchema = z.object({
  first_name: z.string().min(1, "First name is required").default("John"),
  last_name: z.string().min(1, "Last name is required").default("Grow"),
  email: z.string().email("Invalid email format").default("johngrow@gmail.com"),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters long")
    .default("I have a decade experience making braids and locks"),
  specializations: z
    .array(z.string().min(1, "Specialization cannot be empty"))
    .default(["braids"]),
});

export const CreateBookingSchema = z.object({
  stylist_id: z.string().min(1, "Stylist ID is required"),
  service_id: z
    .array(z.string().min(1, "Service ID is required"))
    .min(1, "At least one service ID is required"),
  booking_datetime: z
    .string()
    .refine(
      (val) => !isNaN(Date.parse(val)),
      "Invalid date format. Must be an ISO8601 timestamp (e.g., '2025-02-01T10:00:00.000Z')"
    ),
  additional_notes: z.string().optional(), // Optional field
});

export const GuestSchema = z.object({
  name: z.string(),
  // email: z.optional(validateEmail),
  // phone: z.optional(z.string()),
});
export const GuestFormSchema = z.object({
  guests: z.array(GuestSchema),
});
export type CreateBookingSchemaType = z.infer<typeof CreateBookingSchema>;
export type CreateServicesSchemaType = z.infer<typeof CreateServiceSchema>;
export type CreateStylistSchemaType = z.infer<typeof CreateStylistSchema>;
