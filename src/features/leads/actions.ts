"use server";

import { subscribeFormSchema, type SubscribeFormData } from "@/features/leads/schemas";
import { createClient } from "@/lib/supabase/server";

export type SubscribeResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Server Action que recibe el lead validado del formulario de Suscriptores,
 * lo persiste en Supabase (`public.leads`) y dispara el webhook de n8n.
 *
 * TODO: [LEADS] — automatización de captación (n8n).
 * El POST al webhook se hace DESPUÉS del insert. Si n8n falla, el lead
 * igual queda guardado y devolvemos ok al usuario.
 *
 * Nota n8n (modo test): la URL `/webhook-test/...` solo escucha DESPUÉS
 * de clickear "Execute workflow" / "Listen for test event", y solo para
 * UNA llamada. Para uso continuo hay que activar el workflow y usar `/webhook/...`.
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

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    full_name: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    interest: parsed.data.interest,
    accepts_marketing: parsed.data.acceptsMarketing === true,
  });

  if (error) {
    if (process.env.NODE_ENV === "development") {
      return {
        ok: false,
        error: `No se pudo guardar el lead: ${error.message}`,
      };
    }
    return {
      ok: false,
      error: "No pudimos registrar tu suscripción. Intentá de nuevo en unos minutos.",
    };
  }

  // TODO: [LEADS] — webhook n8n (URL en LEADS_WEBHOOK_URL).
  await notifyLeadsWebhook({
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    interest: parsed.data.interest,
    acceptsMarketing: parsed.data.acceptsMarketing === true,
    createdAt: new Date().toISOString(),
    source: "suscriptores",
  });

  return { ok: true };
}

async function notifyLeadsWebhook(leadPayload: {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  acceptsMarketing: boolean;
  createdAt: string;
  source: string;
}) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[LEADS] LEADS_WEBHOOK_URL no está definida — se omite el webhook.");
    }
    return;
  }

  try {
    // 127.0.0.1 evita rarezas de IPv6 con "localhost" en Windows/Node.
    const url = webhookUrl.replace("://localhost", "://127.0.0.1");

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadPayload),
    });

    if (process.env.NODE_ENV === "development") {
      const body = await response.text();
      if (response.ok) {
        console.info(`[LEADS] Webhook OK (${response.status})`);
      } else {
        console.error(`[LEADS] Webhook ${response.status}: ${body}`);
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[LEADS] No se pudo llamar al webhook de n8n:", err);
    }
  }
}
