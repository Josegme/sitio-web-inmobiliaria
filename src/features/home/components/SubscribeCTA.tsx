import Link from "next/link";
import { Mail } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

/**
 * CTA a la página de Suscriptores desde el Home.
 * Bloque simple con fondo diferenciado — sin formulario acá para no
 * duplicar lógica; el formulario vive en `/suscriptores`.
 */
export function SubscribeCTA() {
  return (
    <section className="bg-primary py-16 text-primary-foreground sm:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
          <Mail className="h-6 w-6" aria-hidden />
        </div>
        <h2 className="max-w-2xl font-heading text-3xl sm:text-4xl">
          Recibí primero las mejores oportunidades
        </h2>
        <p className="max-w-xl text-base text-primary-foreground/85 sm:text-lg">
          Suscribite y te avisamos por email cuando publiquemos una propiedad
          que coincida con lo que buscás.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link href={ROUTES.subscribers}>Quiero suscribirme</Link>
        </Button>
      </Container>
    </section>
  );
}
