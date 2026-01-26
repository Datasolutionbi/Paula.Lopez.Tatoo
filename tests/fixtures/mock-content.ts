import type { BlogPost, Project } from '../../src/schemas/content';

export const validBlogPost: BlogPost = {
  title: 'Principios de Visualización de Datos Efectiva',
  description:
    'Aprende a crear dashboards y visualizaciones que realmente comunican insights y facilitan la toma de decisiones.',
  publishDate: new Date('2026-01-10'),
  category: 'BI',
  tags: ['Visualización', 'Power BI', 'Tableau', 'Dashboard Design'],
  author: 'AndresBI',
  featured: true,
  draft: false,
};

export const validProject: Project = {
  title: 'Dashboard de Ventas con ML',
  description:
    'Dashboard interactivo con predicciones de ventas usando algoritmos de Machine Learning.',
  publishDate: new Date('2026-01-15'),
  tech: ['Power BI', 'Python', 'Scikit-learn', 'SQL Server'],
  github: 'https://github.com/user/sales-dashboard',
  demo: 'https://example.com/demo',
  featured: true,
};

export const invalidBlogPost = {
  title: '', // Too short
  description: 'Too short', // Less than 50 characters
  publishDate: 'invalid-date', // Invalid date format
  category: 'InvalidCategory', // Not in allowed categories
  tags: [], // Empty array
};

export const invalidProject = {
  title: '', // Empty title
  description: 'Too short', // Less than 30 characters
  publishDate: new Date('2026-01-15'),
  tech: [], // Empty tech array
  // Missing github and demo (at least one required)
};

export const mockMarkdownBlogPost = `---
title: "Test Blog Post"
description: "This is a test description that meets the minimum character requirement for validation."
publishDate: 2026-01-25
category: "BI"
tags: ["Power BI", "SQL"]
author: "Test Author"
---

# Test Content

This is the blog post content.
`;

export const mockMarkdownProject = `---
title: "Test Project"
description: "A test project description that is long enough to pass validation requirements."
publishDate: 2026-01-25
tech: ["Python", "SQL"]
github: "https://github.com/test/repo"
featured: true
---

# Project Details

Project content here.
`;
