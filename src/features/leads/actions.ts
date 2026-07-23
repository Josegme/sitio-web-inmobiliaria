"use server";

import { subscribeFormSchema, type SubscribeFormData } from "@/features/leads/schemas";

export type SubscribeResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Server Action que recibe el lead validado del formulario de Suscriptores.
 *
 * TODO: [LEADS] — integración de automatización de captación de leads.
 * Este es el punto exacto donde va a engancharse el módulo propio de
 * automatización (envío a CRM, disparador de email de bienvenida,
 * webhook a n8n / Make / Zapier, o cualquier pipeline que se decida).
 *
 * Pasos esperados una vez implementado:
 * 1. Persistir el lead (Supabase / Postgres / etc.).
 * 2. Disparar la automatización (nueva ventaja: podemos usar
 *    `after()` de Next.js 16 para no bloquear la respuesta al usuario).
 * 3. Loggear errores sin romper la UX (devolver `ok: true` igual y
 *    reintentar en background si la integración externa falla).
 *
 * Hoy: valida el payload y devuelve `ok: true` como stub para que la
 * UI ya pueda mostrar el mensaje de éxito.
 */
export async function submitLeadAction(
  payload: SubscribeFormData,
): Promise<SubscribeResult> {
  const parsed = subscribeFormSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Los datos enviados no son válidos. Revisá el formulario.",
    };
  }

  // Simula una latencia mínima para que la UI muestre el estado de carga.
  await new Promise((resolve) => setTimeout(resolve, 400));

  // TODO: [LEADS] — enviar `parsed.data` a la automatización real.
  // Ejemplo de shape esperado por el consumidor futuro:
  //   await sendToCrm(parsed.data);
  //   await enqueueWelcomeEmail(parsed.data);

  return { ok: true };
}
