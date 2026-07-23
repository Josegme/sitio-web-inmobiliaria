"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS, ROUTES } from "@/lib/constants";

/**
 * Menú lateral para dispositivos mobile.
 * Cierra el sheet al navegar a una nueva ruta.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-72 flex-col">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
          <SheetDescription className="sr-only">
            Navegación principal del sitio
          </SheetDescription>
        </SheetHeader>

        <nav className="mt-6 flex flex-col gap-1 px-4" aria-label="Navegación mobile">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-md px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-4 pb-6">
          <Button asChild className="w-full" onClick={close}>
            <Link href={ROUTES.clientsLogin}>Acceso Clientes</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
