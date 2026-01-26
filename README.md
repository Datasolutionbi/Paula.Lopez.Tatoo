# Portfolio BI & Analytics

Portfolio profesional y blog personal construido con Astro, Tailwind CSS y desplegado en GitHub Pages.

## 🌟 Características

- ✅ **Portfolio Completo**: Experiencia, proyectos, habilidades, educación y certificaciones
- ✅ **Blog Técnico**: Posts sobre BI, Analítica de Datos e Inteligencia Artificial
- ✅ **Documentación**: Guías y recursos técnicos
- ✅ **Diseño Minimalista**: Enfoque profesional y moderno
- ✅ **Responsive**: Optimizado para móvil, tablet y desktop
- ✅ **SEO Optimizado**: Meta tags, sitemap, y structured data
- ✅ **Deploy Automático**: GitHub Actions a GitHub Pages
- ✅ **100% Gratis**: Hosting gratuito en GitHub Pages

## 🚀 Stack Tecnológico

- **[Astro](https://astro.build/)** - Framework de sitios estáticos ultra-rápido
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **TypeScript** - Tipado estático para JavaScript
- **Markdown** - Para contenido de blog y documentación
- **GitHub Actions** - CI/CD automatizado
- **GitHub Pages** - Hosting gratuito

## 📦 Instalación

### Requisitos Previos

- Node.js 18+ ([Descargar](https://nodejs.org/))
- Git ([Descargar](https://git-scm.com/))
- Editor de código (recomendado: VS Code)

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/Pages.git
cd Pages

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

## 🛠️ Comandos Disponibles

### Desarrollo
| Comando | Acción |
|---------|--------|
| `npm install` | Instala las dependencias |
| `npm run dev` | Inicia servidor local en `localhost:4321` |
| `npm run build` | Construye el sitio para producción en `./dist` |
| `npm run preview` | Previsualiza la build localmente |

### Testing y Calidad
| Comando | Acción |
|---------|--------|
| `npm test` | Ejecuta todos los tests |
| `npm run test:coverage` | Tests con reporte de cobertura |
| `npm run lint` | Verifica código con ESLint |
| `npm run format` | Formatea código con Prettier |
| `npm run typecheck` | Verifica tipos TypeScript |
| `npm run validate` | Ejecuta todas las validaciones (lint + test + build) |

## 🧪 Testing

El proyecto incluye un **sistema completo de pruebas** con 100% de cobertura en funciones críticas:

- ✅ **112 tests** ejecutándose exitosamente
- ✅ **Pruebas unitarias** para funciones de utilidad
- ✅ **Validación de contenido** con Zod schemas
- ✅ **Tests de accesibilidad** (WCAG 2.1 AA)
- ✅ **CI/CD** con GitHub Actions
- ✅ **100% coverage** en módulos críticos

**Ver documentación completa:** [TESTING.md](./TESTING.md)

```bash
# Ejecutar tests
npm test

# Ver reporte de cobertura
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
/
├── public/              # Archivos estáticos (imágenes, favicon)
├── src/
│   ├── assets/         # Assets procesados (CSS)
│   ├── components/     # Componentes Astro reutilizables
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ProjectCard.astro
│   │   ├── BlogPostCard.astro
│   │   └── ...
│   ├── content/        # Contenido en Markdown
│   │   ├── blog/       # Posts del blog
│   │   ├── projects/   # Proyectos del portfolio
│   │   └── docs/       # Documentación
│   ├── data/           # Datos estructurados
│   │   ├── site.ts     # Configuración del sitio
│   │   ├── skills.ts   # Habilidades técnicas
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   └── social.ts
│   ├── layouts/        # Layouts de página
│   │   ├── BaseLayout.astro
│   │   ├── BlogLayout.astro
│   │   └── DocsLayout.astro
│   ├── pages/          # Rutas del sitio
│   │   ├── index.astro # Homepage
│   │   ├── blog/       # Sección de blog
│   │   └── docs/       # Sección de docs
│   ├── styles/         # Estilos globales
│   └── utils/          # Funciones auxiliares
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
├── astro.config.mjs    # Configuración de Astro
├── tailwind.config.mjs # Configuración de Tailwind
└── package.json
```

## ⚙️ Personalización

### 1. Información Personal

Edita `src/data/site.ts`:

```typescript
export const SITE = {
  name: "Tu Nombre",
  title: "Portfolio & Blog | Tu Nombre",
  description: "Tu descripción profesional",
  tagline: "Especialista en BI y Analytics",
  url: "https://tu-usuario.github.io/Pages",
  email: "tu@email.com",
  github: "https://github.com/tu-usuario",
  linkedin: "https://linkedin.com/in/tu-usuario"
};
```

### 2. Habilidades Técnicas

Actualiza `src/data/skills.ts` con tus herramientas y nivel de expertise.

### 3. Experiencia Laboral

Modifica `src/data/experience.ts` con tu historial profesional.

### 4. Colores y Estilos

Personaliza la paleta de colores en `tailwind.config.mjs`:

```javascript
colors: {
  primary: {
    DEFAULT: '#3B82F6', // Tu color principal
    dark: '#2563EB',
    light: '#60A5FA'
  }
}
```

### 5. Crear Contenido

**Nuevo Post de Blog:**
```bash
# Crear archivo en src/content/blog/mi-post.md
---
title: "Título del Post"
description: "Descripción"
publishDate: 2026-01-25
category: "Tutorial"
tags: ["BI", "Analytics"]
---

Tu contenido aquí...
```

**Nuevo Proyecto:**
```bash
# Crear archivo en src/content/projects/mi-proyecto.md
---
title: "Mi Proyecto"
description: "Descripción del proyecto"
publishDate: 2026-01-25
tech: ["Power BI", "Python", "SQL"]
github: "https://github.com/..."
featured: true
---

Detalles del proyecto...
```

## 🚀 Deploy a GitHub Pages

### Configuración Inicial

1. **Actualiza `astro.config.mjs`:**
```javascript
export default defineConfig({
  site: 'https://TU-USUARIO.github.io',
  base: '/TU-REPO',
  // ...
});
```

2. **Habilita GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: **GitHub Actions**
   - Guarda los cambios

3. **Push tu código:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

El sitio se desplegará automáticamente en `https://tu-usuario.github.io/tu-repo`

### Deploy Automático

Cada vez que hagas push a la rama `main`, GitHub Actions:
1. Instalará las dependencias
2. Construirá el sitio
3. Lo desplegará automáticamente a GitHub Pages

## 📝 Guía de Uso

Para una guía detallada de personalización y uso, consulta la [Documentación](src/content/docs/inicio-rapido.md).

## 🎨 Diseño

El diseño sigue principios de:
- **Minimalismo**: Espacios en blanco generosos, sin elementos innecesarios
- **Modernidad**: Tipografía Inter, animaciones sutiles, componentes actuales
- **Profesionalismo**: Paleta de colores seria, jerarquía visual clara

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de usarlo como base para tu propio portfolio.

## 🤝 Contribuciones

Si encuentras algún bug o tienes sugerencias de mejora, abre un issue o pull request.

## 📧 Contacto

- **Email**: alex.rivera@example.com (placeholder)
- **LinkedIn**: [tu-usuario](https://linkedin.com/in/tu-usuario) (placeholder)
- **GitHub**: [tu-usuario](https://github.com/tu-usuario) (placeholder)

---

Creado con ❤️ usando Astro y Tailwind CSS
