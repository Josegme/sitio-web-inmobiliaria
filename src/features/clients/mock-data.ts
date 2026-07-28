import type { ClientService } from "@/features/clients/types";

/**
 * Servicios estáticos del panel (historial de pagos, documentos, soporte).
 * Quedan como mock a propósito — fuera del alcance de [AUTH] (ver
 * `.cursor/rules/extension-points.mdc`): `profiles` y `client_operations`
 * ya se sirven desde Supabase (`src/app/clientes/panel/page.tsx`).
 */
export const MOCK_CLIENT_SERVICES: ClientService[] = [
  {
    id: "svc-payments",
    title: "Historial de pagos",
    description: "Consultá tus pagos de alquiler, expensas y comisiones.",
    ctaLabel: "Ver historial",
    href: "#pagos", // placeholder explícito: ancla interna, no `#` vacío
  },
  {
    id: "svc-documents",
    title: "Documentos y contratos",
    description: "Accedé a boletos, contratos y comprobantes firmados.",
    ctaLabel: "Ver documentos",
    href: "#documentos",
  },
  {
    id: "svc-support",
    title: "Soporte prioritario",
    description: "Contactá directamente a tu asesor asignado.",
    ctaLabel: "Contactar asesor",
    href: "#soporte",
  },
];
