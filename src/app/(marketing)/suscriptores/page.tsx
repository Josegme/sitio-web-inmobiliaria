import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SubscribeForm } from "@/features/leads/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Suscribite",
  description:
    "Recibí antes que nadie las mejores oportunidades del mercado. Suscripción sin costo, con opción de cancelación.",
};

export default function SubscribersPage() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="subscribers-heading">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Suscriptores"
            title="Recibí las oportunidades antes que nadie"
            description="Dejanos tu email y te contactamos cuando publiquemos una propiedad que coincida con tu interés. Sin spam."
          />
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>• Publicaciones destacadas curadas por nuestro equipo.</li>
            <li>• Análisis mensual del mercado con datos reales.</li>
            <li>• Alertas por tipo de operación e interés.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <SubscribeForm />
        </div>
      </Container>
    </section>
  );
}
