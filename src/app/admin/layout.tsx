import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Layout del panel administrador.
 * Intencionalmente separado del marketing y del portal de clientes.
 *
 * TODO: [ADMIN] — proteger con autenticación / rol admin (Supabase Auth).
 */
export const metadata: Metadata = {
  title: {
    default: "Administración",
    template: "%s | Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
