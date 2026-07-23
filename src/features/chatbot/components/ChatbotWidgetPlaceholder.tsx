/**
 * TODO: [CHATBOT] — montar widget del chatbot IA.
 *
 * Este componente es intencionalmente un no-op (devuelve null). Se monta
 * en el `MarketingLayout` para dejar declarado el punto de extensión sin
 * ocupar espacio visual. Cuando el integrante que trabaje el chatbot
 * llegue a este archivo, tiene que:
 *
 * 1. Reemplazar el `return null` por el widget flotante real (probablemente
 *    un botón + panel expandible tipo Intercom).
 * 2. Hacerlo Client Component (`"use client"`) porque va a manejar estado.
 * 3. Si depende de un provider (Vercel AI SDK, LangChain, etc.), montar
 *    el provider en el `RootLayout` para evitar duplicación.
 * 4. Posicionarlo con `fixed bottom-6 left-6` para no chocar contra el
 *    `WhatsAppFloatingButton` que ya vive en `bottom-6 right-6`.
 */
export function ChatbotWidgetPlaceholder() {
  return null;
}
