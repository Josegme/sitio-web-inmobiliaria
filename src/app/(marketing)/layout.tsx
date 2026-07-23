import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppFloatingButton } from "@/components/common/WhatsAppFloatingButton";
import { ChatbotWidgetPlaceholder } from "@/features/chatbot/components/ChatbotWidgetPlaceholder";

/**
 * Layout de las páginas públicas (marketing).
 * Contiene navbar, footer y elementos flotantes globales
 * (WhatsApp + placeholder del chatbot).
 * El portal de clientes NO usa este layout — usa `app/clientes/layout.tsx`.
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
      <ChatbotWidgetPlaceholder />
    </div>
  );
}
