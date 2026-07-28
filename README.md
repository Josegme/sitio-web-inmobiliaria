# Inmobiliaria — Sitio web

Sitio web de una inmobiliaria desarrollado como Trabajo Final de la materia **Taller de Desarrollo**.

Proyecto de equipo: cada integrante suma un módulo de IA sobre este scaffold sin tocar el resto del sitio.

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Estilos:** Tailwind CSS v4 + shadcn/ui
- **Formularios:** react-hook-form + Zod
- **Extras:** next-themes (dark mode), lucide-react (íconos)

---

## Requisitos

- **Node.js 20 LTS o superior** — [Descargar](https://nodejs.org)
- **npm 10 o superior** (viene con Node)
- **Git** — [Descargar](https://git-scm.com/downloads)

Verificar versiones:

```bash
node --version
npm --version
git --version
```

---

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone <URL_DEL_REPO>
   cd Inmobiliaria
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Copiar variables de entorno:**

   Copiar `.env.local.example` a `.env.local`. Para desarrollo local funciona con los valores por defecto.

   En Windows PowerShell:
   ```powershell
   Copy-Item .env.local.example .env.local
   ```

   En macOS / Linux:
   ```bash
   cp .env.local.example .env.local
   ```

4. **Levantar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:** [http://localhost:3000](http://localhost:3000)

---

## Módulo de Clientes (auth con Supabase)

El portal de clientes (`/clientes/login` y `/clientes/panel`) usa autenticación real con **Supabase Auth**. Sin los pasos de abajo, la pantalla de login carga pero `signInWithPassword` va a fallar (no hay backend al que loguearse).

### 1. Variables de entorno

Ya están declaradas en `.env.local.example` — solo hay que completarlas en tu `.env.local` con los valores reales del proyecto:

| Variable | Dónde conseguirla |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Dashboard de Supabase → Project Settings → API Keys |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Dashboard de Supabase → Project Settings → API Keys |

### 2. Correr la migración

Antes de poder loguearse, hay que correr la migración `supabase/migrations/20260727130000_create_clients_auth.sql` en el **SQL Editor** del proyecto de Supabase (Dashboard → SQL Editor → New query → pegar el contenido → Run). Crea las tablas `profiles` y `client_operations`, sus policies de RLS, y el trigger que auto-crea el `profile` de cada usuario nuevo.

### 3. Crear un usuario de prueba

Los clientes no se registran solos: los usuarios de prueba se crean a mano desde el Dashboard.

1. Dashboard de Supabase → **Authentication → Users → Add user**.
2. Cargar email y contraseña — son las credenciales para loguearse en `/clientes/login`.
3. Opcional: completar **"User Metadata"** con `{"full_name": "Nombre Apellido"}` para que el trigger cree el `profile` con ese nombre. Si se deja vacío, el `profile` se crea igual, con el placeholder `"Sin nombre"`.

---

## Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el servidor de desarrollo con recarga automática. |
| `npm run build` | Genera la build de producción. |
| `npm run start` | Corre la build de producción (requiere `npm run build` previo). |
| `npm run lint` | Corre ESLint sobre todo el proyecto. |

---

## Flujo de trabajo con Git (para el equipo)

> Esta sección está pensada para quien nunca trabajó con Git en equipo antes.

### Setup inicial (una sola vez)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### Trabajo diario

1. **Traer los cambios más recientes de `main`:**

   ```bash
   git checkout main
   git pull
   ```

2. **Crear tu rama** (elegí el nombre según tu módulo, ver más abajo):

   ```bash
   git checkout -b feature/tu-modulo
   ```

3. **Hacer cambios** y probarlos localmente con `npm run dev`.

4. **Verificar que no hay errores:**

   ```bash
   npm run lint
   npm run build
   ```

5. **Commitear los cambios:**

   ```bash
   git add .
   git commit -m "feat(modulo): descripción corta del cambio"
   ```

   Formato de mensajes (recomendado):
   - `feat(modulo): ...` — nueva funcionalidad
   - `fix(modulo): ...` — corrección de bug
   - `docs: ...` — cambios de documentación
   - `refactor(modulo): ...` — refactor sin cambio funcional

6. **Subir la rama:**

   ```bash
   git push -u origin feature/tu-modulo
   ```

7. **Crear un Pull Request** desde GitHub apuntando a `main`.

### Ramas del equipo

| Módulo | Rama sugerida |
|---|---|
| Automatización de leads | `feature/leads-automation` |
| Búsqueda inteligente en galería | `feature/gallery-search` |
| Chatbot con IA | `feature/chatbot` |
| Cotizador inteligente | `feature/quotation-ai` |
| Acceso de Clientes (auth real) | `feature/clients-auth` |

**Regla clave:** cada uno trabaja en su rama y en los archivos de su módulo (`src/features/<su-modulo>/`). Los archivos están separados por dominio, así que los conflictos de merge son mínimos.

---

## Estructura del proyecto

Para entender dónde va cada cosa, leer **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

En resumen:

```
src/
├── app/          # Rutas del sitio
├── components/   # UI genérica (Navbar, Footer, Button, etc.)
├── features/     # Módulos por dominio (properties, leads, quotation, etc.)
├── lib/          # Utilidades globales (constantes, formateadores)
└── hooks/        # Hooks reutilizables
```

Cada integrante trabaja principalmente en su carpeta bajo `src/features/`.

---

## Datos mock

Todos los datos que aparecen en el sitio son **mock** (ejemplos ficticios). Están definidos en `src/features/<dominio>/mock-data.ts`. Cuando se implemente backend, esos archivos se reemplazan por fetch reales.

---

## Puntos de extensión

Cada módulo tiene un punto de entrada bien delimitado, marcado con un comentario `TODO: [MÓDULO]` en el código. Ver detalles en **[ARCHITECTURE.md](./ARCHITECTURE.md#puntos-de-extensión)** y en `.cursor/rules/extension-points.mdc` (Cursor los lee automáticamente).

---

## Recursos útiles

- [Documentación oficial de Next.js](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [react-hook-form](https://react-hook-form.com)
- [Zod](https://zod.dev)

---

## Licencia

Proyecto académico — Trabajo Final, Taller de Desarrollo.
