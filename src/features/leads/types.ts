/**
 * Tipos del módulo de captación de leads (Suscriptores).
 * El schema de validación con Zod vive en `./schemas.ts` y es la
 * fuente de verdad — este archivo re-exporta el tipo inferido para
 * ergonomía de imports.
 */

import type { SubscribeFormData } from "@/features/leads/schemas";

export type Lead = SubscribeFormData & {
  createdAt: string; // ISO
};

export type LeadInterest = SubscribeFormData["interest"];
