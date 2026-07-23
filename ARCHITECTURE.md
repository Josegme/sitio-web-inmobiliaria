# Arquitectura del proyecto

Documento pensado para compañeros de equipo que arrancan en el proyecto — con o sin experiencia previa en Next.js.

---

## Filosofía general

Cada integrante del equipo va a sumar un módulo de IA en su propia rama. Para que eso no rompa nada, el proyecto se organiza en **capas con responsabilidades claras** y **módulos de dominio aislados** (carpeta `features/`).

**Regla mental de oro:**

> *"¿Esto es UI genérica reutilizable, o pertenece a un dominio del negocio?"*
> Si es genérico → `components/`. Si vive en 1–2 pantallas y tiene lógica de negocio → `features/<dominio>/`.

---

## Estructura de carpetas

```
inmobiliaria/
├── public/                          # Assets estáticos servidos tal cual
│   └── images/
│       ├── properties/              # Imágenes locales de propiedades (por ahora vacío — usamos Unsplash)
│       └── team/                    # Fotos locales del equipo (por ahora vacío)
│
├── src/
│   ├── app/                         # 📍 RUTAS DEL SITIO (App Router)
│   │   ├── (marketing)/             # Grupo con navbar + footer públicos
│   │   │   ├── layout.tsx           #   Layout con Navbar + Footer + WhatsApp + Chatbot placeholder
│   │   │   ├── page.tsx             #   HOME → /
│   │   │   ├── quienes-somos/       #   → /quienes-somos
│   │   │   ├── galeria/             #   → /galeria
│   │   │   ├── suscriptores/        #   → /suscriptores
│   │   │   ├── contacto/            #   → /contacto
│   │   │   └── cotizar/             #   → /cotizar
│   │   │
│   │   ├── clientes/                # Portal privado (layout distinto, sin navbar público)
│   │   │   ├── layout.tsx
│   │   │   ├── login/               #   → /clientes/login
│   │   │   └── panel/               #   → /clientes/panel
│   │   │
│   │   ├── layout.tsx               # ROOT layout: fonts, metadata, ThemeProvider
│   │   ├── globals.css              # Tailwind + tokens de color de la marca
│   │   ├── not-found.tsx            # Página 404
│   │   ├── sitemap.ts               # SEO: sitemap.xml auto-generado
│   │   └── robots.ts                # SEO: robots.txt auto-generado
│   │
│   ├── components/                  # 🧱 UI GENÉRICA (sin lógica de dominio)
│   │   ├── ui/                      #   Componentes shadcn (Button, Card, Input, ...)
│   │   ├── layout/                  #   Navbar, Footer, Container, MobileMenu
│   │   ├── common/                  #   SectionHeading, SocialIcons, WhatsAppFloatingButton, ThemeToggle
│   │   ├── forms/                   #   FormField (wrapper para formularios)
│   │   └── providers/               #   ThemeProvider (next-themes)
│   │
│   ├── features/                    # 🧩 MÓDULOS POR DOMINIO — cada compañero trabaja acá
│   │   ├── home/                    #   Secciones específicas del Home (Hero, ValueProposition, SubscribeCTA)
│   │   ├── properties/              #   ⭐ Inmuebles (mock, PropertyCard, PropertyGrid) — punto de extensión: búsqueda IA
│   │   ├── team/                    #   Quiénes Somos: equipo, historia, diferenciales
│   │   ├── leads/                   #   ⭐ Suscriptores (formulario + server action) — punto de extensión: automatización
│   │   ├── contact/                 #   Contacto: formulario + mapa
│   │   ├── quotation/               #   ⭐ Cotizador (form + calculator mock) — punto de extensión: IA
│   │   ├── clients/                 #   ⭐ Portal de clientes (login + panel + mock) — punto de extensión: auth real
│   │   └── chatbot/                 #   ⭐ Placeholder del widget — punto de extensión: chatbot IA
│   │
│   ├── lib/                         # 🔧 UTILIDADES GLOBALES
│   │   ├── constants.ts             #   COMPANY_INFO, WHATSAPP_NUMBER, SOCIAL_LINKS, ROUTES, NAV_ITEMS, SITE_URL
│   │   ├── format.ts                #   formatCurrency, formatPhoneAR, buildWhatsAppUrl
│   │   └── utils.ts                 #   cn() (helper de shadcn para combinar classes)
│   │
│   └── hooks/
│       └── use-mobile.ts            # Detecta viewport mobile (< 768px)
│
├── .cursor/rules/                   # 🤖 Reglas para Cursor (arquitectura, convenciones, puntos de extensión)
│   ├── architecture.mdc
│   ├── conventions.mdc
│   └── extension-points.mdc
│
├── .env.local.example               # Plantilla de variables de entorno
├── .prettierrc                      # Config de formato
├── eslint.config.mjs                # Config de ESLint
├── next.config.ts                   # Config de Next.js (remotePatterns para imágenes)
├── tailwind.config.ts               # (implícito en Tailwind v4 vía CSS)
├── tsconfig.json                    # Config de TypeScript (paths con alias `@/*`)
├── package.json
├── README.md                        # Instalación y flujo Git
└── ARCHITECTURE.md                  # Este archivo
```

---

## Anatomía de un `feature/`

Cada `feature/<dominio>/` puede tener estos archivos (opcionales según el módulo):

- **`types.ts`** — interfaces y tipos del dominio (ej. `Property`, `Lead`).
- **`schemas.ts`** — schemas de Zod para validación de formularios. El tipo del formulario se infiere del schema, así no hay duplicación.
- **`mock-data.ts`** — datos de ejemplo. Se importa desde las páginas. Cuando exista backend, se reemplaza por una función `fetchXxx()` con la misma firma.
- **`calculator.ts` / `actions.ts`** — lógica de negocio o server actions. Punto de entrada aislado — todo lo demás del feature depende de esta función y no de su implementación.
- **`components/`** — componentes específicos del dominio (ej. `PropertyCard`, `SubscribeForm`).

**Ejemplo — módulo de propiedades:**

```
features/properties/
├── types.ts           # Property, OperationType, PropertyType
├── mock-data.ts       # MOCK_PROPERTIES + getFeaturedProperties()
└── components/
    ├── PropertyCard.tsx        # Tarjeta individual
    ├── PropertyGrid.tsx        # Grilla responsive
    ├── FeaturedProperties.tsx  # Sección "Destacadas" del Home
    └── PropertySearchBar.tsx   # ⭐ TODO: [SEARCH]
```

---

## Reglas de dependencia (importantísimo)

Estas reglas evitan spaghetti code y hacen que sumar un módulo nuevo no toque el resto:

- `features/A/` **NO** debe importar de `features/B/`. Si necesitan compartir algo, va a `lib/` o `components/common/`.
- `components/` **NO** debe importar de `features/` (los componentes son genéricos).
- `lib/` y `hooks/` **NO** deben importar de `features/` ni de `components/`.
- `app/` puede importar de todo.

Si te encontrás violando una de estas reglas, casi siempre es señal de que hay algo que debería subir a `lib/` o `components/common/`.

---

## Flujo de datos

```
mock-data.ts (o fetch real) ──▶ Server Component (page.tsx) ──▶ Componentes de UI
                                        │
                                        ▼
                              Client Components (formularios) ──▶ Server Actions ──▶ Automatización
```

- **Server Components** (todo lo que no tiene `"use client"`): leen datos y renderizan HTML en el servidor. Son la mayoría del sitio.
- **Client Components** (marcados con `"use client"` arriba): usan estado, efectos o event handlers. Solo formularios, menú mobile, toggle de tema y algún componente interactivo puntual.
- **Server Actions** (`"use server"`): funciones que corren en el servidor pero se llaman desde componentes cliente. Los formularios las usan para enviar datos sin API tradicional.

---

## Puntos de extensión

Los puntos donde cada módulo va a engancharse están marcados en el código con `// TODO: [MÓDULO] — ...`.

| Módulo | Responsable | Archivo(s) |
|---|---|---|
| **Automatización de leads** | Dueño del scaffold | `src/features/leads/actions.ts` |
| **Búsqueda inteligente** | Compañero A | `src/features/properties/components/PropertySearchBar.tsx` + `src/app/(marketing)/galeria/page.tsx` |
| **Chatbot** | Compañero B | `src/features/chatbot/components/ChatbotWidgetPlaceholder.tsx` |
| **Cotizador inteligente** | Compañero C | `src/features/quotation/calculator.ts` |
| **Acceso de clientes (auth)** | Sin asignar | `src/features/clients/components/LoginForm.tsx` + `src/app/clientes/layout.tsx` |

Para buscar todos los puntos de extensión en el proyecto:

```bash
# En Windows PowerShell
Select-String -Path .\src\**\*.ts,.\src\**\*.tsx -Pattern "TODO: \["

# En macOS / Linux
grep -rn "TODO: \[" src/
```

---

## Convenciones rápidas

### Naming
- Componentes: `PascalCase.tsx`
- Utilidades / schemas / mock: `kebab-case.ts`
- Tipos e interfaces: `PascalCase`
- Constantes: `UPPER_SNAKE_CASE`
- Rutas de URL: `kebab-case` en español (`/quienes-somos`)

### Imports
- Siempre absolutos con alias `@/` (ej. `import { Foo } from "@/features/properties/types"`).
- Nunca `../../`.

### Exports
- Exports nombrados (`export function Foo() {}`).
- Excepciones obligatorias de Next.js: `page.tsx`, `layout.tsx`, `not-found.tsx`, `sitemap.ts`, `robots.ts`, `next.config.ts`.

### Prohibido en todo el proyecto
- `href="#"` o botones que no hacen nada. Todo link o botón tiene destino real, ancla interna documentada, o está explícitamente atenuado como placeholder.
- Código comentado. Si sobra, se borra (Git guarda el historial).
- `console.log` en producción.
- Duplicar lógica entre componentes.

---

## Recursos

- Ver `.cursor/rules/` para las reglas que la IA aplica automáticamente en Cursor.
- Instalación y flujo Git: ver `README.md`.
