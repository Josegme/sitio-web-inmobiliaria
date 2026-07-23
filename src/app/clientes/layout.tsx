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
 * TODO: [AUTH] — cuando exista autenticación real, este layout es un
 * buen lugar para leer la sesión y redirigir a `/clientes/login` si
 * el usuario no está autenticado.
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
