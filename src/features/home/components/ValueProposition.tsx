import { Building2, KeyRound, Calculator } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";

interface ValueItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const VALUE_ITEMS: ValueItem[] = [
  {
    id: "value-buy",
    icon: Building2,
    title: "Compra segura",
    description:
      "Asesoramiento legal, verificación documental y acompañamiento hasta la escritura.",
  },
  {
    id: "value-rent",
    icon: KeyRound,
    title: "Alquiler ágil",
    description:
      "Proceso 100% digital, evaluación rápida y garantías flexibles adaptadas a cada caso.",
  },
  {
    id: "value-quote",
    icon: Calculator,
    title: "Tasación inteligente",
    description:
      "Estimaciones basadas en comparables reales del mercado, actualizadas semana a semana.",
  },
];

/**
 * Bloque de propuesta de valor del Home. Tres pilares simples,
 * sin cards agresivas — se apoya en tipografía y espacio en blanco.
 */
export function ValueProposition() {
  return (
    <section
      className="py-16 sm:py-20"
      aria-labelledby="value-proposition-heading"
    >
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Nuestra propuesta"
          title="Todo lo que necesitás para tu próxima operación"
          description="Combinamos experiencia humana con herramientas modernas para cada etapa: buscar, cotizar y cerrar."
          align="center"
          className="mx-auto"
        />

        <div className="grid gap-8 sm:grid-cols-3">
          {VALUE_ITEMS.map(({ id, icon: Icon, title, description }) => (
            <article key={id} className="flex flex-col items-start gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="font-heading text-xl">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
