import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { QuotationForm } from "@/features/quotation/components/QuotationForm";

export const metadata: Metadata = {
  title: "Cotizador",
  description:
    "Obtené una estimación inmediata del valor de tu propiedad. Cotización orientativa basada en comparables reales.",
};

export default function QuotationPage() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="quotation-heading">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Cotizador"
          title="Estimá el valor de tu propiedad"
          description="Completá los datos principales y te damos una cotización orientativa al instante. Para una tasación oficial, agendamos una visita presencial."
        />

        <QuotationForm />
      </Container>
    </section>
  );
}
