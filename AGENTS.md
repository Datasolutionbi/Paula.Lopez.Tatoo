# AGENTS.md - Development Guidelines for AI Coding Agents (Guías de Desarrollo para Agentes de IA)

This file provides essential information for AI coding agents working in this repository.
(Este archivo proporciona información esencial para agentes de IA que trabajan en este repositorio.)

## Build, Lint, and Test Commands (Comandos de Compilación, Lint y Pruebas)

**JavaScript/TypeScript:**
```bash
npm install              # install dependencies (instalar dependencias)
npm run build            # build project (compilar proyecto)
npm run lint             # check code style (verificar estilo de código)
npm run lint:fix         # auto-fix issues (auto-corregir problemas)
npm test                 # run all tests (ejecutar todas las pruebas)
npm test -- --watch      # watch mode (modo observación)
npm test path/to/test.spec.ts       # single test file (archivo de prueba único)
npm test -- -t "test name pattern"  # specific test (prueba específica)
npm run typecheck        # type checking (verificación de tipos)
```

**Python:**
```bash
pip install -r requirements.txt  # or: poetry install (instalar dependencias)
pytest                           # all tests (todas las pruebas)
pytest path/to/test_file.py      # single test file (archivo de prueba único)
pytest -k "test_name_pattern"    # specific test (prueba específica)
pytest -v                        # verbose (detallado)
black . --check                  # check formatting (verificar formato)
black .                          # auto-format (auto-formatear)
pylint src/                      # lint (verificar código)
```

**Other Languages (Otros Lenguajes):**
```bash
go test ./... -run TestName          # Go
cargo test test_name                 # Rust
mvn test -Dtest=TestClassName        # Java/Maven
```

## Code Style Guidelines (Guías de Estilo de Código)

### Import Organization (Organización de Imports)

**JavaScript/TypeScript:**
```typescript
// 1. External dependencies (alphabetical) (Dependencias externas - alfabético)
import React from 'react';
import axios from 'axios';

// 2. Internal absolute imports (alphabetical) (Imports absolutos internos - alfabético)
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

// 3. Relative imports (alphabetical) (Imports relativos - alfabético)
import { helper } from './helpers';
import { Config } from './types';

// 4. Type-only imports (separate) (Imports solo de tipos - separado)
import type { User } from '@/types';
```

**Python:**
```python
# 1. Standard library imports
import os
import sys
from typing import Optional, List

# 2. Third-party imports
import numpy as np
import pandas as pd

# 3. Local application imports
from .models import User
from .utils import helper_function
```

### Formatting Standards (Estándares de Formato)

- **Indentation (Indentación)**: Use spaces, not tabs (2 spaces for JS/TS, 4 for Python) (Usar espacios, no tabuladores - 2 espacios para JS/TS, 4 para Python)
- **Line length (Longitud de línea)**: Max 80-100 characters (check project config) (Máximo 80-100 caracteres - verificar configuración del proyecto)
- **Trailing commas (Comas finales)**: Use in multi-line arrays/objects (Usar en arrays/objetos multilínea)
- **Semicolons (Punto y coma)**: Follow project convention (check existing files) (Seguir convención del proyecto - verificar archivos existentes)
- **Quotes (Comillas)**: Single quotes for JS/TS (unless configured otherwise), double quotes for Python (Comillas simples para JS/TS salvo configuración contraria, comillas dobles para Python)

### Type Annotations (Anotaciones de Tipo)

**TypeScript:**
```typescript
// Always use explicit return types (Usar siempre tipos de retorno explícitos)
function calculate(x: number, y: number): number { return x + y; }

// Use interface for objects, type for unions (Usar interface para objetos, type para uniones)
interface User { id: string; name: string; email?: string; }

// Avoid 'any' - use 'unknown' if needed (Evitar 'any' - usar 'unknown' si es necesario)
function process(data: unknown): void { /* type guard required */ }
```

**Python:**
```python
from typing import Optional, List

def calculate(x: int, y: int) -> int:
    return x + y

def get_user(user_id: str) -> Optional[User]:
    pass
```

### Naming Conventions (Convenciones de Nombres)

- **Variables/Functions (Variables/Funciones)**: camelCase (JS/TS), snake_case (Python)
- **Classes (Clases)**: PascalCase (all languages - todos los lenguajes)
- **Constants (Constantes)**: SCREAMING_SNAKE_CASE (all languages - todos los lenguajes)
- **Private members (Miembros privados)**: prefix with underscore `_private` (Python) or use # (JS/TS) (prefijo con guion bajo `_private` en Python o usar # en JS/TS)
- **File names (Nombres de archivos)**: kebab-case or snake_case (be consistent) (kebab-case o snake_case - ser consistente)

```typescript
const API_KEY = 'secret';
class UserService {}
function getUserById(id: string) {}
const _privateHelper = () => {};
```

### Error Handling (Manejo de Errores)

**JavaScript/TypeScript:**
```typescript
// Use try-catch, log with context, create custom error classes (Usar try-catch, registrar con contexto, crear clases de error personalizadas)
async function fetchData(): Promise<Data> {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw new Error('Data fetch failed', { cause: error });
  }
}

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

**Python:**
```python
# Be specific with exception types
try:
    result = risky_operation()
except ValueError as e:
    logger.error(f"Invalid value: {e}")
    raise

class ValidationError(Exception):
    pass
```

## Development Practices (Prácticas de Desarrollo)

### Before Making Changes (Antes de Hacer Cambios)
1. **Read existing code** to understand patterns and conventions (Leer código existente para entender patrones y convenciones)
2. **Check for similar implementations** before creating new utilities (Verificar implementaciones similares antes de crear nuevas utilidades)
3. **Run tests** to ensure current state is working (Ejecutar pruebas para asegurar que el estado actual funciona)
4. **Create a branch** if working in a team environment (Crear una rama si se trabaja en entorno de equipo)

### When Writing Code (Al Escribir Código)
1. **Follow DRY principle**: Don't repeat yourself (Seguir principio DRY: No te repitas)
2. **Keep functions small**: Single responsibility principle (Mantener funciones pequeñas: principio de responsabilidad única)
3. **Write self-documenting code**: Clear names over comments (Escribir código auto-documentado: nombres claros sobre comentarios)
4. **Add comments only when "why" isn't obvious** from code (Agregar comentarios solo cuando el "por qué" no sea obvio)
5. **Prefer composition over inheritance** (Preferir composición sobre herencia)
6. **Use async/await** over callbacks/promises chains (Usar async/await sobre cadenas de callbacks/promesas)

### Testing Guidelines (Guías de Pruebas)
- Write tests for all new features (Escribir pruebas para todas las funciones nuevas)
- Test edge cases and error conditions (Probar casos límite y condiciones de error)
- Aim for high coverage but focus on critical paths (Apuntar a alta cobertura pero enfocarse en rutas críticas)
- Keep tests isolated and independent (Mantener pruebas aisladas e independientes)
- Use descriptive test names: `test_user_login_with_invalid_credentials` (Usar nombres descriptivos para pruebas)

### Git Commit Messages (Mensajes de Commit Git)
```
type(scope): brief description

Detailed explanation if needed

Fixes #issue-number
```

Types (Tipos): feat, fix, docs, style, refactor, test, chore

## Common Pitfalls to Avoid (Errores Comunes a Evitar)

- Don't commit sensitive data (API keys, passwords) (No hacer commit de datos sensibles - claves API, contraseñas)
- Don't commit `node_modules/`, `venv/`, or build artifacts (No hacer commit de node_modules/, venv/ o artefactos de compilación)
- Don't mix refactoring with feature changes in one commit (No mezclar refactorización con cambios de funcionalidad en un commit)
- Don't skip writing tests for critical functionality (No omitir escribir pruebas para funcionalidad crítica)
- Don't use deprecated APIs without documenting why (No usar APIs obsoletas sin documentar el por qué)

---

**Last Updated (Última Actualización)**: 2026-01-25
**Maintained by (Mantenido por)**: Development Team
