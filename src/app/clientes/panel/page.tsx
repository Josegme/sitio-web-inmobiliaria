import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ClientPanelLayout } from "@/features/clients/components/ClientPanelLayout";
import { OperationsList } from "@/features/clients/components/OperationsList";
import { ServiceCard } from "@/features/clients/components/ServiceCard";
import {
  MOCK_CLIENT_OPERATIONS,
  MOCK_CLIENT_PROFILE,
  MOCK_CLIENT_SERVICES,
} from "@/features/clients/mock-data";

export const metadata: Metadata = {
  title: "Mi panel",
  description: "Panel privado del cliente con sus operaciones y servicios.",
};

export default function ClientPanelPage() {
  // TODO: [AUTH] — reemplazar por datos del usuario autenticado.
  const profile = MOCK_CLIENT_PROFILE;

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
          <OperationsList operations={MOCK_CLIENT_OPERATIONS} />
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
