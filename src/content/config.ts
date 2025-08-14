import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    image: z.string().optional(),
    photographerName: z.string().optional(),
    photographerLink: z.string().url().optional().or(z.literal('')),
  }),
});

export const collections = { blog };
