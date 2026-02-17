import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('José Contreras'),
    category: z.enum(['aftercare', 'process', 'tips', 'travel']),
    image: z.string(),
    featured: z.boolean().default(false),
    published: z.boolean().default(true)
  })
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    date: z.coerce.date(),
    category: z.enum(['blackwork', 'realism', 'coverup', 'traditional', 'flash', 'geometric']),
    bodyPart: z.string(),
    size: z.enum(['small', 'medium', 'large', 'sleeve', 'full-body']),
    duration: z.string(),
    images: z.object({
      thumbnail: z.string(),
      stencil: z.string().optional(),
      process: z.array(z.string()).optional(),
      final: z.string(),
      healed: z.string().optional()
    }),
    description: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    published: z.boolean().default(true)
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
