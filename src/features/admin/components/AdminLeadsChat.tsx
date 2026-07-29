"use client";

import { useEffect, useRef } from "react";

/**
 * Chat embebido del Agente RAG de leads (n8n).
 * Requiere NEXT_PUBLIC_N8N_CHAT_URL apuntando al Chat Trigger en modo
 * producción (/webhook/...) con el workflow Active, y CORS permitiendo
 * el origen de esta app (ej. http://localhost:3000).
 *
 * @n8n/chat se importa dinámicamente: el paquete no soporta SSR/prerender.
 */
export function AdminLeadsChat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_URL;

  useEffect(() => {
    if (!webhookUrl || initialized.current || !containerRef.current) return;
    initialized.current = true;

    let cancelled = false;
    let app: { unmount: () => void } | undefined;

    void (async () => {
      const [{ createChat }] = await Promise.all([
        import("@n8n/chat"),
        import("@n8n/chat/style.css"),
      ]);

      if (cancelled || !containerRef.current) return;

      // Vaciar por si HMR dejó nodos viejos
      containerRef.current.replaceChildren();

      app = createChat({
        webhookUrl,
        target: containerRef.current,
        mode: "fullscreen",
        showWelcomeScreen: false,
        // Evita colgar el input si el load de sesión falla / CORS
        loadPreviousSession: false,
        initialMessages: [
          "Hola. Soy el asistente de leads de Horizonte.",
          "Preguntame por leads calientes, resúmenes de la semana o quién pidió tasación.",
        ],
        i18n: {
          en: {
            title: "Agente RAG — Leads",
            subtitle: "Consultá suscriptores y leads con datos reales (n8n).",
            footer: "",
            getStarted: "Nueva conversación",
            inputPlaceholder: "Ej.: ¿cuántos leads calientes tenemos?",
            closeButtonTooltip: "Cerrar chat",
          },
        },
      });
    })();

    return () => {
      cancelled = true;
      app?.unmount();
    };
  }, [webhookUrl]);

  if (!webhookUrl) {
    return (
      <div
        role="alert"
        className="flex h-full min-h-[420px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground"
      >
        Falta configurar <code className="mx-1 font-mono text-xs">NEXT_PUBLIC_N8N_CHAT_URL</code>
        en <code className="mx-1 font-mono text-xs">.env.local</code> y reiniciar el servidor.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id="admin-n8n-chat"
      className="admin-n8n-chat relative isolate z-0 h-[min(70vh,640px)] min-h-[480px] w-full overflow-hidden rounded-lg border border-border bg-background"
    />
  );
}
