import { z } from "zod";

export const createAdSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category_id: z.string().min(1, "Category is required"),
  category_detail_id: z.string().min(1, "Sub-category is required"),
  city_id: z.string().min(1, "City is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  is_featured: z.boolean(),
  location: z.string().optional(),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  images: z.array(z.any()).optional().default([]),
  video: z.any().optional(),
});

export type CreateAdFormData = z.infer<typeof createAdSchema>;
