import type { Metadata } from "next";
import Link from "next/link";
import { Building2 } from "lucide-react";

import { LoginForm } from "@/features/clients/components/LoginForm";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Ingresar",
  description: "Accedé al portal de clientes de la inmobiliaria.",
};

export default function ClientLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <Link
          href={ROUTES.home}
          className="mb-6 inline-flex items-center gap-2 text-lg font-semibold"
          aria-label={`${COMPANY_INFO.name} — volver al inicio`}
        >
          <Building2 className="h-6 w-6 text-primary" aria-hidden />
          <span className="font-heading">{COMPANY_INFO.name}</span>
        </Link>

        <h1 className="mb-1 font-heading text-2xl">Portal de Clientes</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Ingresá con tu email y contraseña para acceder a tu panel.
        </p>

        <LoginForm />
      </div>
    </div>
  );
}
