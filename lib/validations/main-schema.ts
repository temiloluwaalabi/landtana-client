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
// Guest group member schema
const GroupMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().min(7, "Contact is too short"),
  service_ids: z
    .array(z.string().uuid())
    .min(1, "At least one service is required"),
});
export const CreateBookingSchema = z
  .object({
    service_id: z
      .array(z.string().uuid())
      .min(1, "At least one service must be selected"),
    date: z.string().min(1, "Date is required"), // Format: yyyy-MM-dd
    time: z.string().min(1, "Time is required"), // Format: HH:mm
    variations: z.array(z.string().uuid()).optional().default([]),
    style_options: z.string().uuid({ message: "Style option is required" }),
    price: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Price must be a number",
    }),
    duration: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Duration must be a number",
    }),
    is_group: z.boolean(),
    group_size: z.number().int().positive().optional(),
    group_members: z.array(GroupMemberSchema).optional(),
    additional_notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // If is_group is true, validate group fields
    if (data.is_group) {
      if (!data.group_size || data.group_size < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Group size must be at least 1",
          path: ["group_size"],
        });
      }

      if (!data.group_members || data.group_members.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one group member is required",
          path: ["group_members"],
        });
      }
    }
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
