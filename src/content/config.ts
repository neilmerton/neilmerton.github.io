import { defineCollection, z } from 'astro:content';

// Blog collection schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Reading collection schema
const readingCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    finishedDate: z.coerce.date().optional(),
    startedDate: z.coerce.date().optional(),
    rating: z.number().min(1).max(5).optional(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['reading', 'completed', 'want-to-read']).default('want-to-read'),
    coverImage: z.string().optional(),
    thoughts: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  reading: readingCollection,
};
