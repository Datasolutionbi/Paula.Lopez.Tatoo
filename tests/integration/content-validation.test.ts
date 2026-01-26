import { describe, it, expect } from 'vitest';
import { blogPostSchema, projectSchema, BLOG_CATEGORIES } from '../../src/schemas/content';
import { validBlogPost, validProject, invalidBlogPost, invalidProject } from '../fixtures/mock-content';

describe('Blog Post Schema Validation', () => {
  describe('Valid blog posts', () => {
    it('should validate a complete valid blog post', () => {
      const result = blogPostSchema.safeParse(validBlogPost);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe(validBlogPost.title);
        expect(result.data.category).toBe('BI');
      }
    });

    it('should accept all valid categories', () => {
      BLOG_CATEGORIES.forEach((category) => {
        const post = { ...validBlogPost, category };
        const result = blogPostSchema.safeParse(post);
        expect(result.success).toBe(true);
      });
    });

    it('should set default values for optional fields', () => {
      const minimalPost = {
        title: 'Test Post',
        description: 'This is a test description that meets the minimum character requirement.',
        publishDate: new Date('2026-01-25'),
        category: 'BI',
        tags: ['Power BI'],
      };
      
      const result = blogPostSchema.safeParse(minimalPost);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.author).toBe('AndresBI');
        expect(result.data.featured).toBe(false);
        expect(result.data.draft).toBe(false);
      }
    });

    it('should accept description at minimum length (50 chars)', () => {
      const post = {
        ...validBlogPost,
        description: 'A'.repeat(50), // Exactly 50 characters
      };
      const result = blogPostSchema.safeParse(post);
      expect(result.success).toBe(true);
    });

    it('should accept up to 8 tags', () => {
      const post = {
        ...validBlogPost,
        tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6', 'Tag7', 'Tag8'],
      };
      const result = blogPostSchema.safeParse(post);
      expect(result.success).toBe(true);
    });
  });

  describe('Invalid blog posts', () => {
    it('should reject empty title', () => {
      const post = { ...validBlogPost, title: '' };
      const result = blogPostSchema.safeParse(post);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('título es requerido');
      }
    });

    it('should reject title longer than 100 characters', () => {
      const post = { ...validBlogPost, title: 'A'.repeat(101) };
      const result = blogPostSchema.safeParse(post);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('demasiado largo');
      }
    });

    it('should reject description shorter than 50 characters', () => {
      const post = { ...validBlogPost, description: 'Too short' };
      const result = blogPostSchema.safeParse(post);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('al menos 50 caracteres');
      }
    });

    it('should reject description longer than 300 characters', () => {
      const post = { ...validBlogPost, description: 'A'.repeat(301) };
      const result = blogPostSchema.safeParse(post);
      expect(result.success).toBe(false);
    });

    it('should reject invalid category', () => {
      const post = { ...validBlogPost, category: 'InvalidCategory' as any };
      const result = blogPostSchema.safeParse(post);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('categoría debe ser una de');
      }
    });

    it('should reject empty tags array', () => {
      const post = { ...validBlogPost, tags: [] };
      const result = blogPostSchema.safeParse(post);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('al menos un tag');
      }
    });

    it('should reject more than 8 tags', () => {
      const post = {
        ...validBlogPost,
        tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6', 'Tag7', 'Tag8', 'Tag9'],
      };
      const result = blogPostSchema.safeParse(post);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('No más de 8 tags');
      }
    });

    it('should reject invalid date format', () => {
      const post = { ...validBlogPost, publishDate: 'invalid-date' as any };
      const result = blogPostSchema.safeParse(post);
      expect(result.success).toBe(false);
    });

    it('should reject missing required fields', () => {
      const incompletePost = {
        title: 'Test',
      };
      const result = blogPostSchema.safeParse(incompletePost);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('Project Schema Validation', () => {
  describe('Valid projects', () => {
    it('should validate a complete valid project', () => {
      const result = projectSchema.safeParse(validProject);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe(validProject.title);
        expect(result.data.tech).toHaveLength(4);
      }
    });

    it('should accept project with only GitHub link', () => {
      const project = {
        ...validProject,
        demo: undefined,
      };
      const result = projectSchema.safeParse(project);
      expect(result.success).toBe(true);
    });

    it('should accept project with only Demo link', () => {
      const project = {
        ...validProject,
        github: undefined,
      };
      const result = projectSchema.safeParse(project);
      expect(result.success).toBe(true);
    });

    it('should accept description at minimum length (30 chars)', () => {
      const project = {
        ...validProject,
        description: 'A'.repeat(30),
      };
      const result = projectSchema.safeParse(project);
      expect(result.success).toBe(true);
    });

    it('should accept up to 10 technologies', () => {
      const project = {
        ...validProject,
        tech: ['Tech1', 'Tech2', 'Tech3', 'Tech4', 'Tech5', 'Tech6', 'Tech7', 'Tech8', 'Tech9', 'Tech10'],
      };
      const result = projectSchema.safeParse(project);
      expect(result.success).toBe(true);
    });
  });

  describe('Invalid projects', () => {
    it('should reject empty title', () => {
      const project = { ...validProject, title: '' };
      const result = projectSchema.safeParse(project);
      expect(result.success).toBe(false);
    });

    it('should reject description shorter than 30 characters', () => {
      const project = { ...validProject, description: 'Too short' };
      const result = projectSchema.safeParse(project);
      expect(result.success).toBe(false);
    });

    it('should reject empty tech array', () => {
      const project = { ...validProject, tech: [] };
      const result = projectSchema.safeParse(project);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('al menos una tecnología');
      }
    });

    it('should reject more than 10 technologies', () => {
      const project = {
        ...validProject,
        tech: Array(11).fill('Tech'),
      };
      const result = projectSchema.safeParse(project);
      expect(result.success).toBe(false);
    });

    it('should reject invalid GitHub URL', () => {
      const project = { ...validProject, github: 'not-a-url' };
      const result = projectSchema.safeParse(project);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('inválida');
      }
    });

    it('should reject invalid Demo URL', () => {
      const project = { ...validProject, demo: 'not-a-url' };
      const result = projectSchema.safeParse(project);
      expect(result.success).toBe(false);
    });

    it('should reject project without GitHub or Demo', () => {
      const project = {
        ...validProject,
        github: undefined,
        demo: undefined,
      };
      const result = projectSchema.safeParse(project);
      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessage = result.error.issues[0].message;
        expect(errorMessage).toContain('al menos un enlace');
      }
    });
  });
});

describe('Content Validation Best Practices', () => {
  it('should provide clear error messages in Spanish', () => {
    const invalidPost = {
      title: '',
      description: 'Short',
      publishDate: new Date(),
      category: 'Invalid',
      tags: [],
    };
    
    const result = blogPostSchema.safeParse(invalidPost);
    expect(result.success).toBe(false);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        // All error messages should be in Spanish
        expect(issue.message).toMatch(/[áéíóúñ]|es|debe|requerido/i);
      });
    }
  });

  it('should handle date coercion correctly', () => {
    const postWithStringDate = {
      ...validBlogPost,
      publishDate: '2026-01-25',
    };
    
    const result = blogPostSchema.safeParse(postWithStringDate);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.publishDate).toBeInstanceOf(Date);
    }
  });

  it('should validate all required fields are present', () => {
    const requiredFields = ['title', 'description', 'publishDate', 'category', 'tags'];
    
    requiredFields.forEach((field) => {
      const incompletePost = { ...validBlogPost };
      delete (incompletePost as any)[field];
      
      const result = blogPostSchema.safeParse(incompletePost);
      expect(result.success).toBe(false);
    });
  });
});
