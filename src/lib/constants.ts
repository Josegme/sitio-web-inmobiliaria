/**
 * Constantes globales del proyecto.
 *
 * Todos los datos "de la empresa" viven acá: nombre, contacto, redes,
 * rutas del sitio. Cambiar un dato en un solo lugar en vez de buscar
 * por todos los componentes.
 */

export const COMPANY_INFO = {
  name: "Horizonte Propiedades",
  legalName: "Horizonte Propiedades S.R.L.",
  tagline: "Tu próximo hogar, con confianza y cercanía",
  description:
    "Inmobiliaria con más de 20 años en el mercado. Especialistas en venta y alquiler de propiedades residenciales y comerciales en Buenos Aires.",
  email: "contacto@horizontepropiedades.com.ar",
  phoneDisplay: "+54 11 5555-1234",
  address: "Av. Corrientes 1234, C1043 CABA, Argentina",
  // Coordenadas usadas por el mapa embebido de Contacto (Obelisco como placeholder real).
  location: {
    lat: -34.6037,
    lng: -58.3816,
  },
} as const;

/**
 * Número de WhatsApp en formato E.164 sin `+`, tal como lo espera wa.me.
 * Formato: código de país + código de área + número, sin espacios ni guiones.
 */
export const WHATSAPP_NUMBER = "5491155551234";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola! Me interesa recibir información sobre sus propiedades.";

/**
 * Enlaces de redes sociales.
 * IMPORTANTE: si un enlace no está confirmado, marcalo con `isPlaceholder: true`
 * para que el componente `SocialIcons` lo renderice como tal (sin `href="#"`).
 */
export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    isPlaceholder: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    isPlaceholder: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    isPlaceholder: true,
  },
] as const;

/**
 * Rutas del sitio. Usar SIEMPRE `ROUTES.xxx` en `<Link href={...}>` para
 * evitar strings sueltos y facilitar refactors futuros.
 */
export const ROUTES = {
  home: "/",
  about: "/quienes-somos",
  gallery: "/galeria",
  subscribers: "/suscriptores",
  contact: "/contacto",
  quotation: "/cotizar",
  clientsLogin: "/clientes/login",
  clientsPanel: "/clientes/panel",
} as const;

/**
 * Ítems del menú principal (Navbar y Footer). El módulo de Acceso de
 * Clientes se muestra como CTA separado en el Navbar, no como link plano.
 */
export const NAV_ITEMS = [
  { label: "Inicio", href: ROUTES.home },
  { label: "Quiénes Somos", href: ROUTES.about },
  { label: "Galería", href: ROUTES.gallery },
  { label: "Cotizar", href: ROUTES.quotation },
  { label: "Suscriptores", href: ROUTES.subscribers },
  { label: "Contacto", href: ROUTES.contact },
] as const;

/**
 * URL pública del sitio, usada para metadata absoluta, sitemap y OpenGraph.
 * En producción tiene que salir de `NEXT_PUBLIC_SITE_URL`.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://horizontepropiedades.com.ar";
