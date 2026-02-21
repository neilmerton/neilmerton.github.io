import { defineCollection, z } from 'astro:content';

// Blog collection schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    description: z.string(),
    draft: z.boolean().default(false),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    title: z.string(),
    updatedDate: z.coerce.date().optional(),
  }),
});

// Reading collection schema
const readingCollection = defineCollection({
  type: 'content',
  schema: z.object({
    author: z.string(),
    coverImage: z.string().optional(),
    finishedDate: z.coerce.date().optional(),
    rating: z.number().min(1).max(5).optional(),
    startedDate: z.coerce.date().optional(),
    status: z.enum(['reading', 'completed', 'want-to-read']).default('want-to-read'),
    tags: z.array(z.string()).default([]),
    thoughts: z.string().optional(),
    title: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  reading: readingCollection,
};
