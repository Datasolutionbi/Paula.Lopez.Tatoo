import { z } from 'zod';

// Categorías permitidas para blog posts
export const BLOG_CATEGORIES = ['BI', 'Analytics', 'IA', 'Tutorial', 'Guía'] as const;

// Tags comunes
export const COMMON_TAGS = [
  'Power BI',
  'Tableau',
  'Python',
  'SQL',
  'Machine Learning',
  'Data Analytics',
  'ETL',
  'Visualización',
  'Dashboard Design',
] as const;

// Schema para blog posts
export const blogPostSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(100, 'El título es demasiado largo'),
  description: z
    .string()
    .min(50, 'La descripción debe tener al menos 50 caracteres')
    .max(300, 'La descripción es demasiado larga'),
  publishDate: z.coerce.date({
    required_error: 'La fecha de publicación es requerida',
    invalid_type_error: 'Formato de fecha inválido',
  }),
  category: z.enum(BLOG_CATEGORIES, {
    errorMap: () => ({ message: `La categoría debe ser una de: ${BLOG_CATEGORIES.join(', ')}` }),
  }),
  tags: z
    .array(z.string())
    .min(1, 'Debe haber al menos un tag')
    .max(8, 'No más de 8 tags permitidos'),
  author: z.string().optional().default('AndresBI'),
  featured: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),
});

// Schema para proyectos
export const projectSchema = z
  .object({
    title: z.string().min(1, 'El título es requerido').max(100, 'El título es demasiado largo'),
    description: z
      .string()
      .min(30, 'La descripción debe tener al menos 30 caracteres')
      .max(300, 'La descripción es demasiado larga'),
    publishDate: z.coerce.date({
      required_error: 'La fecha de publicación es requerida',
    }),
    tech: z
      .array(z.string())
      .min(1, 'Debe especificar al menos una tecnología')
      .max(10, 'No más de 10 tecnologías'),
    github: z.string().url('URL de GitHub inválida').optional(),
    demo: z.string().url('URL de demo inválida').optional(),
    featured: z.boolean().optional().default(false),
    image: z.string().optional(),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        })
      )
      .optional(),
  })
  .refine((data) => data.github || data.demo, {
    message: 'Debe proporcionar al menos un enlace (GitHub o Demo)',
    path: ['github'],
  });

// Schema para documentación
export const docsSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  order: z.number().int().positive().optional(),
  section: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

// Tipos TypeScript inferidos
export type BlogPost = z.infer<typeof blogPostSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Docs = z.infer<typeof docsSchema>;
