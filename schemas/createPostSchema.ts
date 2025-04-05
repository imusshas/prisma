import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 character")
    .max(50, "Title must be at max 50 character"),
  content: z.string().min(1, "Content is required").min(10, "Content must be at least 10 character"),
});