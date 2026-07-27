import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ClientPanelLayout } from "@/features/clients/components/ClientPanelLayout";
import { OperationsList } from "@/features/clients/components/OperationsList";
import { ServiceCard } from "@/features/clients/components/ServiceCard";
import { MOCK_CLIENT_SERVICES } from "@/features/clients/mock-data";
import type { ClientOperation, ClientProfile } from "@/features/clients/types";
import { ROUTES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Mi panel",
  description: "Panel privado del cliente con sus operaciones y servicios.",
};

// TODO: [AUTH] — resuelto (commit 8b318cd): datos reales desde Supabase (profiles + client_operations).
export default async function ClientPanelPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // El proxy (`src/proxy.ts`) ya protege esta ruta; esta es una segunda
  // verificación defensiva por si el Server Component se renderiza sin
  // pasar por el proxy (ver guía de Data Security de Next.js).
  if (!user) {
    redirect(ROUTES.clientsLogin);
  }

  const [{ data: profileRow }, { data: operationRows }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, created_at")
      .eq("id", user.id)
      .single(),
    supabase
      .from("client_operations")
      .select("id, title, property_address, operation_type, status, next_step, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false }),
  ]);

  // Sin fila de `profiles` no hay datos de cliente que mostrar: el
  // usuario existe en Auth pero todavía no fue cargado a la base.
  if (!profileRow) {
    redirect(ROUTES.clientsLogin);
  }

  const profile: ClientProfile = {
    fullName: profileRow.full_name,
    email: user.email ?? "",
    memberSince: profileRow.created_at,
  };

  const operations: ClientOperation[] = (operationRows ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    propertyAddress: row.property_address,
    operationType: row.operation_type,
    status: row.status,
    updatedAt: row.updated_at,
    nextStep: row.next_step ?? undefined,
  }));

  return (
    <ClientPanelLayout clientName={profile.fullName.split(" ")[0]}>
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Mi panel"
          title={`Hola, ${profile.fullName.split(" ")[0]}`}
          description="Este es tu espacio privado. Encontrá tus operaciones vigentes y accedé a los servicios exclusivos."
        />

        <section className="flex flex-col gap-4" aria-labelledby="operations-heading">
          <h2 id="operations-heading" className="font-heading text-xl">
            Tus operaciones
          </h2>
          <OperationsList operations={operations} />
        </section>

        <section className="flex flex-col gap-4" aria-labelledby="services-heading">
          <h2 id="services-heading" className="font-heading text-xl">
            Servicios disponibles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_CLIENT_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </Container>
    </ClientPanelLayout>
  );
}
