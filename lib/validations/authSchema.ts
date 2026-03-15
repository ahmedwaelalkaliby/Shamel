import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  password_confirmation: z.string().min(6, "Password confirmation is required"),
  city: z.string().min(1, "City is required"),
  type: z.union([z.literal("personal"), z.literal("commercial")]),


  image: z.any().optional(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
