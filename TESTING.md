# 🧪 Guía de Testing - Portfolio BI & Analytics

Este documento describe el sistema completo de pruebas implementado en el proyecto, siguiendo las mejores prácticas de la industria.

## 📋 Tabla de Contenidos

- [Resumen Ejecutivo](#resumen-ejecutivo)
- [Tipos de Pruebas](#tipos-de-pruebas)
- [Comandos Disponibles](#comandos-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Coverage y Métricas](#coverage-y-métricas)
- [Mejores Prácticas](#mejores-prácticas)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

---

## 📊 Resumen Ejecutivo

### Estado Actual

- ✅ **112 tests** ejecutándose exitosamente
- ✅ **100% de cobertura** en funciones críticas
- ✅ **5 archivos de test** organizados por tipo
- ✅ **CI/CD** integrado con GitHub Actions
- ✅ **Accesibilidad** validada con axe-core
- ✅ **Validación de contenido** con Zod schemas

### Tecnologías Utilizadas

| Herramienta | Propósito | Versión |
|-------------|-----------|---------|
| Vitest | Test runner y framework | ^4.0.18 |
| @vitest/coverage-v8 | Reporte de cobertura | ^4.0.18 |
| JSDOM | Simulación de DOM | ^27.4.0 |
| axe-core | Testing de accesibilidad | ^4.11.1 |
| Zod | Validación de schemas | ^3.x |
| ESLint | Linting de código | ^9.39.2 |
| Prettier | Formateo de código | ^3.8.1 |

---

## 🎯 Tipos de Pruebas

### 1. Pruebas Unitarias (Unit Tests)

**Ubicación:** `src/**/*.test.ts`

**Archivos:**
- `src/utils/formatDate.test.ts` (12 tests)
- `src/utils/readingTime.test.ts` (21 tests)

**Cobertura:** 100% en funciones de utilidad

**Ejemplo:**
```typescript
describe('formatDate', () => {
  it('should format date in Spanish locale', () => {
    const date = new Date(2026, 0, 25);
    const result = formatDate(date);
    expect(result).toBe('25 de enero de 2026');
  });
});
```

**Comando:**
```bash
npm run test -- src/utils/
```

---

### 2. Pruebas de Validación de Contenido

**Ubicación:** `tests/integration/content-validation.test.ts`

**Tests:** 29 pruebas de schemas Zod

**Valida:**
- ✅ Frontmatter de blog posts (título, descripción, fecha, categoría, tags)
- ✅ Frontmatter de proyectos (tech stack, links, descripción)
- ✅ Campos requeridos y opcionales
- ✅ Tipos de datos y formatos
- ✅ Mensajes de error en español

**Schemas definidos:**
```typescript
// src/schemas/content.ts
export const blogPostSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(50).max(300),
  publishDate: z.coerce.date(),
  category: z.enum(['BI', 'Analytics', 'IA', 'Tutorial', 'Guía']),
  tags: z.array(z.string()).min(1).max(8),
  // ...
});
```

---

### 3. Pruebas de Archivos Markdown

**Ubicación:** `tests/integration/markdown-files.test.ts`

**Tests:** 33 pruebas dinámicas

**Valida:**
- ✅ Todos los archivos `.md` en `src/content/blog/`
- ✅ Todos los archivos `.md` en `src/content/projects/`
- ✅ Frontmatter válido según schemas
- ✅ Contenido no vacío
- ✅ No duplicados de títulos
- ✅ Fechas consistentes

**Ejemplo de salida:**
```
✓ Blog Posts Markdown Files
  ✓ Blog post: visualizacion-datos-efectiva.md
    ✓ should have valid frontmatter schema
    ✓ should have non-empty content
    ✓ should have title in frontmatter
```

---

### 4. Pruebas de Accesibilidad (A11y)

**Ubicación:** `tests/accessibility/a11y.test.ts`

**Tests:** 17 pruebas WCAG 2.1 Level AA

**Valida:**
- ✅ Estructura semántica HTML (header, main, footer)
- ✅ Jerarquía de headings (h1, h2, h3)
- ✅ Atributo `lang` en HTML
- ✅ Navegación accesible con ARIA labels
- ✅ Alt text en imágenes
- ✅ Labels en formularios
- ✅ Contraste de colores (documentado)
- ✅ Navegación por teclado
- ✅ Tests automatizados con axe-core

**Estándares:**
- Contraste texto normal: 4.5:1 mínimo
- Contraste texto grande: 3:1 mínimo
- UI components: 3:1 mínimo

---

## 🚀 Comandos Disponibles

### Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con UI interactiva
npm run test:ui

# Ejecutar tests una vez (para CI)
npm run test:run

# Generar reporte de cobertura
npm run test:coverage
```

### Linting y Formato

```bash
# Verificar código con ESLint
npm run lint

# Auto-fix problemas de linting
npm run lint:fix

# Verificar formato con Prettier
npm run format:check

# Formatear código automáticamente
npm run format
```

### Type Checking

```bash
# Verificar tipos TypeScript
npm run typecheck
```

### Validación Completa

```bash
# Ejecutar todas las validaciones (lint + typecheck + tests + build)
npm run validate
```

---

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── utils/
│   │   ├── formatDate.ts
│   │   ├── formatDate.test.ts      ← Tests unitarios
│   │   ├── readingTime.ts
│   │   └── readingTime.test.ts     ← Tests unitarios
│   ├── schemas/
│   │   └── content.ts               ← Schemas Zod
│   └── content/
│       ├── blog/                    ← Validados por tests
│       └── projects/                ← Validados por tests
├── tests/
│   ├── setup.ts                     ← Configuración global
│   ├── types.d.ts                   ← Tipos custom matchers
│   ├── fixtures/
│   │   └── mock-content.ts          ← Datos de prueba
│   ├── integration/
│   │   ├── content-validation.test.ts
│   │   └── markdown-files.test.ts
│   └── accessibility/
│       └── a11y.test.ts
├── vitest.config.ts                 ← Configuración Vitest
├── eslint.config.js                 ← Configuración ESLint
├── .prettierrc                      ← Configuración Prettier
└── .github/workflows/
    └── test.yml                     ← GitHub Actions CI/CD
```

---

## 📊 Coverage y Métricas

### Reporte de Cobertura

Ejecutar: `npm run test:coverage`

```
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |     100 |      100 |     100 |     100 |                   
 schemas         |     100 |      100 |     100 |     100 |                   
  content.ts     |     100 |      100 |     100 |     100 |                   
 utils           |     100 |      100 |     100 |     100 |                   
  formatDate.ts  |     100 |      100 |     100 |     100 |                   
  readingTime.ts |     100 |      100 |     100 |     100 |                   
-----------------|---------|----------|---------|---------|-------------------
```

### Objetivos de Coverage

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| Statements | 80% | 100% ✅ |
| Branches | 80% | 100% ✅ |
| Functions | 80% | 100% ✅ |
| Lines | 80% | 100% ✅ |

### Reportes Generados

Después de ejecutar `npm run test:coverage`:

- **HTML Report:** `coverage/index.html` (abrir en navegador)
- **LCOV:** `coverage/lcov.info` (para herramientas CI/CD)
- **JSON:** `coverage/coverage.json` (para análisis programático)
- **Text:** Impreso en consola

---

## ✅ Mejores Prácticas Implementadas

### 1. Organización de Tests

✅ **Co-location:** Tests unitarios junto a su código fuente
```
src/utils/formatDate.ts
src/utils/formatDate.test.ts  ← Mismo directorio
```

✅ **Separación por tipo:** Tests de integración y accesibilidad separados
```
tests/integration/
tests/accessibility/
```

### 2. Naming Conventions

✅ **Descriptivo y en inglés:**
```typescript
// ✅ Bien
it('should format date in Spanish locale with full month name', () => {})

// ❌ Evitar
it('test 1', () => {})
it('funciona', () => {})
```

### 3. AAA Pattern (Arrange-Act-Assert)

```typescript
it('should calculate reading time correctly', () => {
  // Arrange - Preparar
  const content = 'word '.repeat(200);
  
  // Act - Ejecutar
  const result = getReadingTime(content);
  
  // Assert - Verificar
  expect(result).toBe('1 min de lectura');
});
```

### 4. Test Isolation

✅ **Tests independientes:** Cada test puede ejecutarse solo
✅ **Sin estado compartido:** No usar variables globales
✅ **Cleanup automático:** Configurado en `tests/setup.ts`

### 5. Data-Driven Tests

```typescript
const testCases = [
  { input: 200, expected: '1 min de lectura' },
  { input: 400, expected: '2 min de lectura' },
  { input: 900, expected: '5 min de lectura' },
];

testCases.forEach(({ input, expected }) => {
  it(`should handle ${input} words`, () => {
    const content = 'word '.repeat(input);
    expect(getReadingTime(content)).toBe(expected);
  });
});
```

### 6. Manejo de Fechas

✅ **Evitar UTC issues:**
```typescript
// ✅ Bien - Crear fecha con componentes locales
const date = new Date(2026, 0, 25); // Month is 0-indexed

// ❌ Evitar - String puede interpretarse como UTC
const date = new Date('2026-01-25');
```

### 7. Mensajes de Error Claros

```typescript
// Zod schemas con mensajes personalizados en español
title: z.string().min(1, 'El título es requerido')
description: z.string().min(50, 'La descripción debe tener al menos 50 caracteres')
```

---

## 🔄 CI/CD Integration

### GitHub Actions Workflow

**Archivo:** `.github/workflows/test.yml`

**Se ejecuta en:**
- ✅ Push a `main`, `master`, `develop`
- ✅ Pull Requests

**Pasos:**
1. Checkout código
2. Setup Node.js 18
3. Instalar dependencias (`npm ci`)
4. Linting (`npm run lint`)
5. Formato (`npm run format:check`)
6. Type checking (`npm run typecheck`)
7. Tests con coverage (`npm run test:coverage`)
8. Build del proyecto (`npm run build`)
9. Upload coverage a Codecov (opcional)

**Ver resultados:**
- GitHub Actions tab en tu repositorio
- Check verde/rojo en commits y PRs

---

## 🔧 Configuración

### Vitest (`vitest.config.ts`)

```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
```

### ESLint (`eslint.config.js`)

```javascript
export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
    },
  },
];
```

### Prettier (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

---

## 🐛 Troubleshooting

### Tests Fallan por Timezone

**Problema:** Fechas muestran un día diferente al esperado

**Solución:** Usar constructor de Date con componentes locales
```typescript
// ✅ Correcto
const date = new Date(2026, 0, 25);

// ❌ Puede causar problemas
const date = new Date('2026-01-25');
```

### Coverage No Alcanza Threshold

**Problema:** "Coverage for X (Y%) does not meet threshold (80%)"

**Solución:**
1. Identificar líneas no cubiertas: `coverage/index.html`
2. Agregar tests para casos faltantes
3. Considerar excluir archivos no críticos en `vitest.config.ts`

### ESLint Errors en Archivos Astro

**Problema:** ESLint no reconoce sintaxis de Astro

**Solución:** Ya configurado en `eslint.config.js`:
```javascript
import eslintPluginAstro from 'eslint-plugin-astro';
export default [
  ...eslintPluginAstro.configs.recommended,
];
```

### Tests Lentos

**Problema:** Tests tardan mucho en ejecutarse

**Optimizaciones:**
- Ejecutar solo archivos modificados: `npm test -- --changed`
- Usar modo watch durante desarrollo: `npm run test:watch`
- Configurar timeout específico si es necesario

---

## 📚 Recursos y Referencias

### Documentación Oficial

- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [axe-core](https://github.com/dequelabs/axe-core)
- [Zod](https://zod.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Mejores Prácticas

- [Testing Best Practices (Testim)](https://www.testim.io/blog/unit-testing-best-practices/)
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

## 📞 Soporte

Si encuentras problemas o tienes preguntas:

1. Revisa esta documentación
2. Consulta los tests existentes como ejemplos
3. Ejecuta `npm run validate` para verificar todo
4. Revisa logs de GitHub Actions para errores de CI/CD

---

**Última actualización:** 2026-01-25  
**Mantenido por:** Equipo de Desarrollo  
**Coverage actual:** 100% ✅
