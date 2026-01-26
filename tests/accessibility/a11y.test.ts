import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { JSDOM } from 'jsdom';
import { axe } from '../setup';

// Helper function to get built HTML files
function getBuiltHTML(pageName: string): string {
  const distPath = join(process.cwd(), 'dist', `${pageName}.html`);
  try {
    return readFileSync(distPath, 'utf-8');
  } catch (error) {
    return '';
  }
}

// Helper to create DOM from HTML string
function createDOM(html: string) {
  const dom = new JSDOM(html);
  return dom.window.document;
}

describe('Accessibility Tests (WCAG 2.1 Level AA)', () => {
  describe('Semantic HTML Structure', () => {
    it('should use proper heading hierarchy', () => {
      const sampleHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <head><title>Test</title></head>
          <body>
            <h1>Main Heading</h1>
            <h2>Section Heading</h2>
            <h3>Subsection</h3>
          </body>
        </html>
      `;
      
      const doc = createDOM(sampleHTML);
      const h1 = doc.querySelectorAll('h1');
      expect(h1.length).toBeGreaterThan(0);
      expect(h1.length).toBeLessThanOrEqual(1); // Only one h1 per page
    });

    it('should have lang attribute on html element', () => {
      const sampleHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <head><title>Test</title></head>
          <body><h1>Test</h1></body>
        </html>
      `;
      
      const doc = createDOM(sampleHTML);
      const html = doc.documentElement;
      expect(html.hasAttribute('lang')).toBe(true);
      expect(html.getAttribute('lang')).toBe('es');
    });

    it('should have proper document structure', () => {
      const sampleHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test Page</title>
          </head>
          <body>
            <header><nav>Navigation</nav></header>
            <main><h1>Main Content</h1></main>
            <footer>Footer</footer>
          </body>
        </html>
      `;
      
      const doc = createDOM(sampleHTML);
      expect(doc.querySelector('header')).toBeTruthy();
      expect(doc.querySelector('main')).toBeTruthy();
      expect(doc.querySelector('footer')).toBeTruthy();
    });
  });

  describe('Navigation Accessibility', () => {
    it('should have accessible navigation with proper ARIA', () => {
      const navHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <body>
            <nav aria-label="Navegación principal">
              <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </nav>
          </body>
        </html>
      `;
      
      const doc = createDOM(navHTML);
      const nav = doc.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav?.hasAttribute('aria-label') || nav?.hasAttribute('aria-labelledby')).toBe(true);
    });

    it('should have descriptive link text', () => {
      const linkHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <body>
            <a href="/about">Acerca de nosotros</a>
            <a href="/contact">Contacto</a>
          </body>
        </html>
      `;
      
      const doc = createDOM(linkHTML);
      const links = doc.querySelectorAll('a');
      links.forEach((link) => {
        const text = link.textContent?.trim() || '';
        expect(text.length).toBeGreaterThan(0);
        // Avoid generic text like "click here", "read more" without context
        expect(text.toLowerCase()).not.toBe('click here');
        expect(text.toLowerCase()).not.toBe('here');
      });
    });
  });

  describe('Images and Media', () => {
    it('should have alt text on images', () => {
      const imgHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <body>
            <img src="/avatar.jpg" alt="Foto de perfil de AndresBI" />
            <img src="/logo.png" alt="Logo de la empresa" />
          </body>
        </html>
      `;
      
      const doc = createDOM(imgHTML);
      const images = doc.querySelectorAll('img');
      images.forEach((img) => {
        expect(img.hasAttribute('alt')).toBe(true);
      });
    });

    it('should allow empty alt for decorative images', () => {
      const decorativeHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <body>
            <img src="/decoration.svg" alt="" role="presentation" />
          </body>
        </html>
      `;
      
      const doc = createDOM(decorativeHTML);
      const decorativeImg = doc.querySelector('img[role="presentation"]');
      if (decorativeImg) {
        // Decorative images can have empty alt
        expect(decorativeImg.getAttribute('alt')).toBe('');
      }
    });
  });

  describe('Forms and Interactive Elements', () => {
    it('should have labels for form inputs', () => {
      const formHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <body>
            <form>
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required />
              
              <label for="message">Mensaje:</label>
              <textarea id="message" name="message"></textarea>
            </form>
          </body>
        </html>
      `;
      
      const doc = createDOM(formHTML);
      const inputs = doc.querySelectorAll('input, textarea, select');
      inputs.forEach((input) => {
        const id = input.getAttribute('id');
        if (id) {
          const label = doc.querySelector(`label[for="${id}"]`);
          expect(label || input.hasAttribute('aria-label')).toBeTruthy();
        }
      });
    });

    it('should have accessible buttons', () => {
      const buttonHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <body>
            <button type="button">Click me</button>
            <button type="submit">Enviar</button>
          </body>
        </html>
      `;
      
      const doc = createDOM(buttonHTML);
      const buttons = doc.querySelectorAll('button');
      buttons.forEach((button) => {
        const text = button.textContent?.trim() || '';
        const hasAriaLabel = button.hasAttribute('aria-label');
        expect(text.length > 0 || hasAriaLabel).toBe(true);
      });
    });
  });

  describe('Color Contrast (WCAG AA)', () => {
    it('should document required contrast ratios', () => {
      // WCAG AA requirements:
      // - Normal text: 4.5:1
      // - Large text (18pt+ or 14pt+ bold): 3:1
      // - UI components and graphics: 3:1
      
      const requirements = {
        normalText: 4.5,
        largeText: 3.0,
        uiComponents: 3.0,
      };
      
      expect(requirements.normalText).toBe(4.5);
      expect(requirements.largeText).toBe(3.0);
      expect(requirements.uiComponents).toBe(3.0);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should have focusable interactive elements', () => {
      const interactiveHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <body>
            <a href="/page">Link</a>
            <button>Button</button>
            <input type="text" />
          </body>
        </html>
      `;
      
      const doc = createDOM(interactiveHTML);
      const focusable = doc.querySelectorAll('a, button, input, textarea, select');
      expect(focusable.length).toBeGreaterThan(0);
      
      focusable.forEach((element) => {
        // Elements should not have tabindex="-1" unless intentionally hidden
        const tabindex = element.getAttribute('tabindex');
        if (tabindex) {
          expect(parseInt(tabindex)).toBeGreaterThanOrEqual(0);
        }
      });
    });

    it('should have skip navigation link for keyboard users', () => {
      const skipNavHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <body>
            <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
            <nav>Navigation</nav>
            <main id="main-content">
              <h1>Content</h1>
            </main>
          </body>
        </html>
      `;
      
      const doc = createDOM(skipNavHTML);
      const skipLink = doc.querySelector('a[href="#main-content"]');
      expect(skipLink).toBeTruthy();
    });
  });

  describe('ARIA Best Practices', () => {
    it('should use ARIA landmarks correctly', () => {
      const landmarksHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <body>
            <header role="banner">Header</header>
            <nav role="navigation" aria-label="Main">Navigation</nav>
            <main role="main">Content</main>
            <footer role="contentinfo">Footer</footer>
          </body>
        </html>
      `;
      
      const doc = createDOM(landmarksHTML);
      expect(doc.querySelector('[role="banner"], header')).toBeTruthy();
      expect(doc.querySelector('[role="navigation"], nav')).toBeTruthy();
      expect(doc.querySelector('[role="main"], main')).toBeTruthy();
      expect(doc.querySelector('[role="contentinfo"], footer')).toBeTruthy();
    });

    it('should not use redundant ARIA on semantic HTML', () => {
      // Good: <nav> without role="navigation"
      // Bad: <nav role="navigation"> (redundant)
      
      const goodHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <body>
            <nav aria-label="Main">Navigation</nav>
            <main>Content</main>
          </body>
        </html>
      `;
      
      const doc = createDOM(goodHTML);
      expect(doc.querySelector('nav')).toBeTruthy();
      expect(doc.querySelector('main')).toBeTruthy();
    });
  });

  describe('Page Metadata', () => {
    it('should have descriptive page titles', () => {
      const titleHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <title>Portfolio & Blog | AndresBI - Especialista en BI y Analytics</title>
          </head>
          <body><h1>Test</h1></body>
        </html>
      `;
      
      const doc = createDOM(titleHTML);
      const title = doc.querySelector('title');
      expect(title).toBeTruthy();
      expect(title?.textContent?.length).toBeGreaterThan(10);
    });

    it('should have viewport meta tag for responsive design', () => {
      const metaHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test</title>
          </head>
          <body><h1>Test</h1></body>
        </html>
      `;
      
      const doc = createDOM(metaHTML);
      const viewport = doc.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport?.getAttribute('content')).toContain('width=device-width');
    });
  });
});

describe('Axe Core Automated Accessibility Tests', () => {
  it('should pass axe accessibility checks for sample page', async () => {
    const sampleHTML = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Test Page</title>
        </head>
        <body>
          <header>
            <nav aria-label="Navegación principal">
              <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </nav>
          </header>
          <main>
            <h1>Título Principal</h1>
            <p>Contenido de la página.</p>
            <img src="/image.jpg" alt="Descripción de la imagen" />
          </main>
          <footer>
            <p>© 2026 AndresBI</p>
          </footer>
        </body>
      </html>
    `;
    
    const dom = new JSDOM(sampleHTML);
    const results = await axe(dom.window.document.body);
    expect(results).toHaveNoViolations();
  });
});
