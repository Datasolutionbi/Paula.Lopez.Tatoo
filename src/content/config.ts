import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()),
    author: z.string().default('Andres Rivera'),
    image: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    tech: z.array(z.string()),
    github: z.string().optional(),
    demo: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(0)
  })
});

export const collections = { blog, projects, docs };
