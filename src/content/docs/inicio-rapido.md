---
title: "Guía de Inicio Rápido"
description: "Aprende a configurar y personalizar este portfolio para tu perfil profesional."
order: 1
---

# Guía de Inicio Rápido

Bienvenido a tu nuevo portfolio profesional construido con Astro, Tailwind CSS y desplegado en GitHub Pages.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js 18+** - [Descargar](https://nodejs.org/)
- **Git** - [Descargar](https://git-scm.com/)
- **Un editor de código** - Recomendamos [VS Code](https://code.visualstudio.com/)

## Instalación Local

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/Pages.git
cd Pages
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

## Personalización

### Configuración del Sitio

Edita `src/data/site.ts` para actualizar tu información:

```typescript
export const SITE = {
  name: "Tu Nombre",
  title: "Portfolio & Blog | Tu Nombre",
  description: "Tu descripción profesional",
  tagline: "Tu tagline o slogan",
  url: "https://tu-usuario.github.io/Pages",
  author: "Tu Nombre",
  email: "tu@email.com",
  github: "https://github.com/tu-usuario",
  linkedin: "https://linkedin.com/in/tu-usuario",
  avatar: "/images/avatar.jpg"
};
```

### Actualizar Habilidades

Modifica `src/data/skills.ts` para reflejar tu stack tecnológico:

```typescript
export const skills = {
  bi: {
    title: "Business Intelligence",
    tools: [
      { name: "Power BI", level: "Avanzado" },
      // Agrega tus herramientas...
    ]
  },
  // Más categorías...
};
```

### Agregar Experiencia

Edita `src/data/experience.ts`:

```typescript
export const experience = [
  {
    company: "Tu Empresa",
    position: "Tu Puesto",
    period: "2022 - Presente",
    description: "Descripción de tus responsabilidades",
    achievements: [
      "Logro 1",
      "Logro 2"
    ],
    tech: ["Tech1", "Tech2"]
  }
];
```

### Configurar para GitHub Pages

1. **Actualiza `astro.config.mjs`:**

```javascript
export default defineConfig({
  site: 'https://TU-USUARIO.github.io',
  base: '/TU-REPO',  // Nombre de tu repositorio
  // ...
});
```

2. **Habilita GitHub Pages:**
   - Ve a Settings → Pages en tu repositorio
   - Source: GitHub Actions
   - El workflow en `.github/workflows/deploy.yml` se ejecutará automáticamente

## Crear Contenido

### Nuevo Post de Blog

Crea un archivo en `src/content/blog/`:

```markdown
---
title: "Título del Post"
description: "Descripción breve"
publishDate: 2026-01-25
category: "Tutorial"
tags: ["tag1", "tag2"]
author: "Tu Nombre"
---

# Tu contenido aquí

Escribe tu post en Markdown...
```

### Nuevo Proyecto

Crea un archivo en `src/content/projects/`:

```markdown
---
title: "Nombre del Proyecto"
description: "Descripción del proyecto"
publishDate: 2026-01-25
tech: ["Tech1", "Tech2"]
github: "https://github.com/..."
demo: "https://..."
featured: true
---

Descripción detallada del proyecto...
```

## Comandos Disponibles

| Comando | Acción |
|---------|--------|
| `npm run dev` | Inicia servidor local en `localhost:4321` |
| `npm run build` | Construye el sitio para producción en `./dist` |
| `npm run preview` | Previsualiza la build localmente |

## Estructura del Proyecto

```
/
├── public/              # Archivos estáticos (imágenes, favicon)
├── src/
│   ├── assets/         # Assets procesados (CSS, etc.)
│   ├── components/     # Componentes Astro reutilizables
│   ├── content/        # Contenido en Markdown
│   │   ├── blog/       # Posts del blog
│   │   ├── projects/   # Proyectos
│   │   └── docs/       # Documentación
│   ├── data/           # Datos estructurados (skills, experience)
│   ├── layouts/        # Layouts de página
│   ├── pages/          # Rutas del sitio
│   └── utils/          # Funciones auxiliares
├── astro.config.mjs    # Configuración de Astro
└── tailwind.config.mjs # Configuración de Tailwind
```

## Deploy a GitHub Pages

El deploy es automático:

1. Haz push a la rama `main`:
```bash
git add .
git commit -m "Actualizar contenido"
git push origin main
```

2. GitHub Actions construirá y desplegará automáticamente

3. Tu sitio estará en: `https://tu-usuario.github.io/tu-repo`

## Soporte

Si encuentras problemas:

1. Revisa la [documentación de Astro](https://docs.astro.build/)
2. Consulta [Tailwind CSS docs](https://tailwindcss.com/docs)
3. Abre un issue en el repositorio

## Próximos Pasos

- [ ] Personaliza colores en `tailwind.config.mjs`
- [ ] Agrega tu foto en `public/images/avatar.jpg`
- [ ] Escribe tu primer post de blog
- [ ] Agrega tus proyectos reales
- [ ] Conecta Google Analytics (opcional)
- [ ] Configura dominio personalizado (opcional)

¡Feliz desarrollo! 🚀
