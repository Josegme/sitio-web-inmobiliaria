import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AdminLeadsChat } from "@/features/admin/components/AdminLeadsChat";
import { AdminModuleCard } from "@/features/admin/components/AdminModuleCard";
import { AdminShell } from "@/features/admin/components/AdminShell";

export const metadata: Metadata = {
  title: "Panel",
  description: "Panel administrador de la inmobiliaria.",
};

/**
 * Scaffold del panel admin.
 * - Chat RAG (n8n) operativo vía NEXT_PUBLIC_N8N_CHAT_URL
 * - Módulos de inmuebles y suscriptores como placeholders hasta cablear CRUD
 */
export default function AdminPage() {
  return (
    <AdminShell>
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Administración"
          title="Panel interno"
          description="Consultá leads con el agente RAG, y próximamente gestioná inmuebles y suscriptores desde acá."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminModuleCard
            icon="users"
            title="Suscriptores / leads"
            description="Listado y filtros desde Supabase. Por ahora usá el agente RAG (lee la planilla de leads)."
            status="próximamente"
          />
          <AdminModuleCard
            icon="building"
            title="Inmuebles"
            description="Alta y edición de propiedades del catálogo. Punto de extensión para reemplazar el mock de galería."
            status="próximamente"
          />
        </div>

        <AdminModuleCard
          icon="chat"
          title="Agente RAG de leads"
          description="Chateá con el automatismo de n8n sobre leads reales (Google Sheets / captación)."
          status="activo"
        >
          <AdminLeadsChat />
        </AdminModuleCard>
      </Container>
    </AdminShell>
  );
}
