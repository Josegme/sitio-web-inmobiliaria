import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Layout del portal de clientes.
 *
 * Intencionalmente NO monta navbar/footer públicos ni el WhatsApp
 * flotante — la experiencia del portal es privada y no debe mezclarse
 * con la del sitio comercial. Cada página (`login`, `panel`) monta
 * su propio header (ver `ClientPanelLayout`).
 *
 * TODO: [AUTH] — resuelto (commit 8b318cd): la protección de
 * `/clientes/panel` quedó en `src/proxy.ts` / `src/lib/supabase/proxy.ts`
 * (corre antes de este layout, para toda la app) en vez de acá.
 */
export const metadata: Metadata = {
  title: {
    default: "Portal de Clientes",
    template: "%s | Portal de Clientes",
  },
  robots: { index: false, follow: false },
};

export default function ClientsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
