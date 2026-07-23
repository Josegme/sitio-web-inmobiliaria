import Link from "next/link";
import { Building2, LogOut } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";

interface ClientPanelLayoutProps {
  clientName: string;
  children: ReactNode;
}

/**
 * Layout visual del panel del cliente. Provee un header propio (sin
 * navbar público) con la marca, el saludo al cliente y un botón
 * "Salir" que hoy vuelve al login.
 *
 * TODO: [AUTH] — reemplazar el botón "Salir" por logout real
 * (limpiar sesión / cookies / token).
 */
export function ClientPanelLayout({ clientName, children }: ClientPanelLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href={ROUTES.home}
            className="inline-flex items-center gap-2 text-lg font-semibold"
            aria-label={`${COMPANY_INFO.name} — ir al inicio`}
          >
            <Building2 className="h-6 w-6 text-primary" aria-hidden />
            <span className="font-heading">{COMPANY_INFO.name}</span>
          </Link>

          <div className="flex items-center gap-3">
            <p className="hidden text-sm text-muted-foreground sm:block">
              Hola, <span className="font-medium text-foreground">{clientName}</span>
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href={ROUTES.clientsLogin}>
                <LogOut className="h-4 w-4" aria-hidden />
                Salir
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-10">{children}</main>
    </div>
  );
}
