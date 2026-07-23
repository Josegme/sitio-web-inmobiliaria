import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";

/**
 * Sección "Historia de la empresa". Usa imagen ilustrativa de Unsplash
 * como placeholder profesional — reemplazar por foto real de la oficina
 * cuando esté disponible.
 */
export function CompanyStory() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="company-story-heading">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
            alt="Equipo de la inmobiliaria trabajando en oficina moderna"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <SectionHeading
            eyebrow="Quiénes somos"
            title="Dos décadas construyendo confianza"
          />
          <p className="text-base text-muted-foreground sm:text-lg">
            Nacimos en el 2004 como una inmobiliaria de barrio y crecimos hasta
            operar en toda el área metropolitana de Buenos Aires. Nuestro pilar
            sigue siendo el mismo: atención personalizada, información clara y
            defensa transparente de los intereses de cada cliente.
          </p>
          <p className="text-base text-muted-foreground sm:text-lg">
            Hoy combinamos ese trato humano con herramientas digitales modernas
            —búsqueda inteligente, cotización asistida y atención 24/7— para que
            comprar, vender o alquilar sea una experiencia sin fricciones.
          </p>
        </div>
      </Container>
    </section>
  );
}
