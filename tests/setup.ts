import { expect } from 'vitest';
import { configureAxe } from 'vitest-axe';

// Configure axe for testing
export const axe = configureAxe({
  rules: {
    // Customize rules if needed
    // 'color-contrast': { enabled: true },
  },
});

// Custom matcher for axe results
expect.extend({
  toHaveNoViolations(results: { violations: any[] }) {
    const pass = results.violations.length === 0;
    
    if (pass) {
      return {
        message: () => 'Expected to have accessibility violations but found none',
        pass: true,
      };
    }
    
    const violationMessages = results.violations.map((violation: any) => {
      return `${violation.id}: ${violation.description}\n  ${violation.nodes.map((node: any) => node.html).join('\n  ')}`;
    }).join('\n\n');
    
    return {
      message: () => `Expected no accessibility violations but found:\n\n${violationMessages}`,
      pass: false,
    };
  },
});
