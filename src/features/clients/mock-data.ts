import type {
  ClientOperation,
  ClientProfile,
  ClientService,
} from "@/features/clients/types";

/**
 * Datos mock del cliente logueado. Se muestran en el panel mientras
 * no exista autenticación real.
 * TODO: [AUTH] — reemplazar por datos del usuario autenticado.
 */
export const MOCK_CLIENT_PROFILE: ClientProfile = {
  fullName: "Julieta García",
  email: "julieta.garcia@ejemplo.com.ar",
  memberSince: "2022-03-15T00:00:00Z",
};

export const MOCK_CLIENT_OPERATIONS: ClientOperation[] = [
  {
    id: "op-001",
    title: "Compra departamento Palermo",
    propertyAddress: "Av. Santa Fe 3200, Palermo",
    operationType: "compra",
    status: "en-proceso",
    updatedAt: "2026-07-12T10:32:00Z",
    nextStep: "Firma de boleto — 05/08/2026",
  },
  {
    id: "op-002",
    title: "Alquiler local Belgrano",
    propertyAddress: "Cabildo 2400, Belgrano",
    operationType: "alquiler",
    status: "activa",
    updatedAt: "2026-06-30T14:00:00Z",
    nextStep: "Renovación de contrato — 01/03/2027",
  },
  {
    id: "op-003",
    title: "Venta PH Caballito",
    propertyAddress: "Rojas 1150, Caballito",
    operationType: "venta",
    status: "finalizada",
    updatedAt: "2025-11-20T09:00:00Z",
  },
];

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
