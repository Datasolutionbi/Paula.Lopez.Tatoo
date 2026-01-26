import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { blogPostSchema, projectSchema } from '../../src/schemas/content';

const BLOG_DIR = join(process.cwd(), 'src/content/blog');
const PROJECTS_DIR = join(process.cwd(), 'src/content/projects');

function getMarkdownFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((file) => file.endsWith('.md'));
}

function parseMarkdownFile(filePath: string) {
  const content = readFileSync(filePath, 'utf-8');
  const { data, content: markdownContent } = matter(content);
  return { frontmatter: data, content: markdownContent };
}

describe('Blog Posts Markdown Files', () => {
  const blogFiles = getMarkdownFiles(BLOG_DIR);

  if (blogFiles.length === 0) {
    it('should have blog post files', () => {
      expect(blogFiles.length).toBeGreaterThan(0);
    });
  } else {
    it(`should find blog post files (found ${blogFiles.length})`, () => {
      expect(blogFiles.length).toBeGreaterThan(0);
    });

    blogFiles.forEach((file) => {
      describe(`Blog post: ${file}`, () => {
        const filePath = join(BLOG_DIR, file);
        const { frontmatter, content } = parseMarkdownFile(filePath);

        it('should have valid frontmatter schema', () => {
          const result = blogPostSchema.safeParse(frontmatter);
          if (!result.success) {
            console.error(`Validation errors in ${file}:`, result.error.format());
          }
          expect(result.success).toBe(true);
        });

        it('should have non-empty content', () => {
          expect(content.trim().length).toBeGreaterThan(0);
        });

        it('should have title in frontmatter', () => {
          expect(frontmatter.title).toBeDefined();
          expect(typeof frontmatter.title).toBe('string');
          expect(frontmatter.title.length).toBeGreaterThan(0);
        });

        it('should have valid publishDate', () => {
          expect(frontmatter.publishDate).toBeDefined();
          const date = new Date(frontmatter.publishDate);
          expect(date.toString()).not.toBe('Invalid Date');
        });

        it('should have tags array', () => {
          expect(Array.isArray(frontmatter.tags)).toBe(true);
          expect(frontmatter.tags.length).toBeGreaterThan(0);
        });

        it('should have valid category', () => {
          expect(frontmatter.category).toBeDefined();
          expect(typeof frontmatter.category).toBe('string');
        });
      });
    });
  }
});

describe('Project Markdown Files', () => {
  const projectFiles = getMarkdownFiles(PROJECTS_DIR);

  if (projectFiles.length === 0) {
    it('should have project files', () => {
      expect(projectFiles.length).toBeGreaterThan(0);
    });
  } else {
    it(`should find project files (found ${projectFiles.length})`, () => {
      expect(projectFiles.length).toBeGreaterThan(0);
    });

    projectFiles.forEach((file) => {
      describe(`Project: ${file}`, () => {
        const filePath = join(PROJECTS_DIR, file);
        const { frontmatter, content } = parseMarkdownFile(filePath);

        it('should have valid frontmatter schema', () => {
          const result = projectSchema.safeParse(frontmatter);
          if (!result.success) {
            console.error(`Validation errors in ${file}:`, result.error.format());
          }
          expect(result.success).toBe(true);
        });

        it('should have non-empty content', () => {
          expect(content.trim().length).toBeGreaterThan(0);
        });

        it('should have title in frontmatter', () => {
          expect(frontmatter.title).toBeDefined();
          expect(typeof frontmatter.title).toBe('string');
        });

        it('should have tech array', () => {
          expect(Array.isArray(frontmatter.tech)).toBe(true);
          expect(frontmatter.tech.length).toBeGreaterThan(0);
        });

        it('should have at least GitHub or demo link', () => {
          const hasGithub = frontmatter.github && frontmatter.github.length > 0;
          const hasDemo = frontmatter.demo && frontmatter.demo.length > 0;
          expect(hasGithub || hasDemo).toBe(true);
        });
      });
    });
  }
});

describe('Content File Quality Checks', () => {
  it('should not have duplicate blog post titles', () => {
    const blogFiles = getMarkdownFiles(BLOG_DIR);
    const titles = blogFiles.map((file) => {
      const { frontmatter } = parseMarkdownFile(join(BLOG_DIR, file));
      return frontmatter.title;
    });

    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  it('should not have duplicate project titles', () => {
    const projectFiles = getMarkdownFiles(PROJECTS_DIR);
    const titles = projectFiles.map((file) => {
      const { frontmatter } = parseMarkdownFile(join(PROJECTS_DIR, file));
      return frontmatter.title;
    });

    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  it('should have consistent date format across all blog posts', () => {
    const blogFiles = getMarkdownFiles(BLOG_DIR);
    blogFiles.forEach((file) => {
      const { frontmatter } = parseMarkdownFile(join(BLOG_DIR, file));
      const date = new Date(frontmatter.publishDate);
      expect(date.toString()).not.toBe('Invalid Date');
    });
  });
});
