import { z, defineCollection } from "astro:content";

export const posts = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    createdAt: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    image: z.string(),
  }),
});

export const collections = { posts };
