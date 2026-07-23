import { MessageCircle } from "lucide-react";

import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_NUMBER } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/format";

/**
 * Botón flotante fijo de WhatsApp. Se monta en el `MarketingLayout` para
 * que aparezca en todas las páginas públicas. Abre `wa.me` con un mensaje
 * prellenado configurable en `WHATSAPP_DEFAULT_MESSAGE`.
 */
export function WhatsAppFloatingButton() {
  const href = buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactarnos por WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}
