import Link from "next/link";
import { Building2, Home } from "lucide-react";
import type { ReactNode } from "react";

import { COMPANY_INFO, ROUTES } from "@/lib/constants";

interface AdminShellProps {
  children: ReactNode;
}

/**
 * Layout visual del panel administrador (sin navbar comercial).
 * TODO: [ADMIN] — proteger con autenticación / rol admin real.
 */
export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-lg font-semibold">
            <Building2 className="h-6 w-6 text-primary" aria-hidden />
            <span className="font-heading">
              {COMPANY_INFO.name}{" "}
              <span className="text-sm font-normal text-muted-foreground">Admin</span>
            </span>
          </div>

          <Link
            href={ROUTES.home}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Home className="h-4 w-4" aria-hidden />
            Ir al sitio
          </Link>
        </div>
      </header>

      <main className="flex-1 py-10">{children}</main>
    </div>
  );
}
