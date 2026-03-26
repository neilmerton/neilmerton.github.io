import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

// Blog collection schema
const blogCollection = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    description: z.string(),
    draft: z.boolean().default(false),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    title: z.string(),
    updatedDate: z.coerce.date().optional(),
  }),
});

// Concert collection schema
const concertsCollection = defineCollection({
  loader: file('./src/data/concerts.json'),
  schema: z.object({
    artist: z.string(),
    date: z.coerce.date(),
    venue: z.string(),
    notes: z.string().optional(),
    photo: z.string().optional(),
    support: z.array(z.string()).default([]),
  }),
});

// Reading collection schema
const readingCollection = defineCollection({
  loader: glob({ base: './src/content/reading', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    author: z.string(),
    finishedDate: z.coerce.date().optional(),
    rating: z.number().min(1).max(5).optional(),
    status: z.enum(['reading', 'completed', 'want-to-read']).default('want-to-read'),
    tags: z.array(z.string()).default([]),
    thoughts: z.string().optional(),
    title: z.string(),
  }),
});

// Work collection schema
const workCollection = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    cover: image(),
    description: z.string(),
    date: z.coerce.date(),
    link: z.url().optional(),
    status: z.enum(['live', 'archived', 'upcoming']),
    tags: z.array(z.string()).default([]),
    title: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  concerts: concertsCollection,
  reading: readingCollection,
  work: workCollection,
};