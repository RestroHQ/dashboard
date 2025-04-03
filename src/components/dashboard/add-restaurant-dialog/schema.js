import { z } from "zod";

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const restaurantSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase and contain only letters, numbers, and hyphens",
    ),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address"),
  website: z
    .string()
    .url({ message: "Invalid website URL" })
    .optional()
    .nullable(),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
  cuisineType: z.string().min(2, "Cuisine type must be at least 2 characters"),
  openingTime: z
    .string()
    .regex(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid opening time format (HH:MM)",
    ),
  closingTime: z
    .string()
    .regex(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid closing time format (HH:MM)",
    ),
  openDays: z
    .array(z.string())
    .min(1, "At least one open day must be selected"),
  taxNumber: z.string().optional(),
  description: z.string().optional(),
  capacity: z
    .number()
    .min(1, "Capacity must be at least 1")
    .int()
    .positive("Capacity must be at least 1"),
  isDeliveryEnabled: z.boolean().default(false),
});

export const defaultValues = {
  name: "",
  slug: "",
  address: "",
  email: "",
  phone: "",
  website: "",
  logo: "",
  coverImage: "",
  cuisineType: "",
  openingTime: "09:00",
  closingTime: "23:00",
  openDays: [],
  taxNumber: "",
  description: "",
  capacity: 0,
  isDeliveryEnabled: false,
};
