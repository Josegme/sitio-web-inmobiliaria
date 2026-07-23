import Link from "next/link";
import { Building2 } from "lucide-react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO, NAV_ITEMS, ROUTES } from "@/lib/constants";

/**
 * Barra de navegación principal del sitio público.
 * En desktop muestra logo + items horizontales + CTA "Acceso Clientes";
 * en mobile delega los items a `MobileMenu` (Sheet lateral).
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href={ROUTES.home}
          className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight"
          aria-label={`${COMPANY_INFO.name} — ir al inicio`}
        >
          <Building2 className="h-6 w-6 text-primary" aria-hidden />
          <span className="font-heading">{COMPANY_INFO.name}</span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-6 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={ROUTES.clientsLogin}>Acceso Clientes</Link>
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
