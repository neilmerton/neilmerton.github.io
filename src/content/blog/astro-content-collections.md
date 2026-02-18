---
title: "Getting started with Astro content collections"
description: "Astro's content collections give you type-safe access to your markdown files. Here's how to set them up and why they're worth it."
pubDate: "2024-07-20"
tags: ["astro", "typescript"]
---

If you're building a site with Astro and you're storing content in markdown files, content collections are the right way to do it. They give you full TypeScript type safety, schema validation, and a clean API for querying your content.

## Setting up a collection

Collections live in `src/content/`. Create a `config.ts` file there to define your schemas using Zod:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

## Querying your content

Use `getCollection` to fetch entries. You can filter in the query itself:

```typescript
import { getCollection } from 'astro:content';

// Only published posts, sorted newest first
const posts = await getCollection('blog', ({ data }) => !data.draft);
posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```

The `data` object on each entry is fully typed based on your schema. TypeScript knows `data.pubDate` is a `Date`, `data.tags` is `string[]`, and so on.

## Rendering content

Each entry has a `render()` method that returns a `Content` component:

```astro
---
const { Content } = await post.render();
---

<article>
  <Content />
</article>
```

This handles everything — remark/rehype transforms, syntax highlighting, whatever you've configured in `astro.config.mjs`.

## Why bother?

The main benefit is catching content errors at build time. If you add a new blog post and forget the `title` field, the build fails with a helpful error instead of silently shipping broken content. Over time this pays for itself many times over.
