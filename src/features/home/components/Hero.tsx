import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";

/**
 * Hero del Home. Imagen de fondo optimizada con `next/image` en
 * modo `fill`, overlay para contraste y CTAs principales (Ver galería
 * + Cotizar).
 */
export function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[70vh] items-center overflow-hidden text-white"
      aria-labelledby="hero-heading"
    >
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
        alt="Interior luminoso de una propiedad moderna"
        fill
        sizes="100vw"
        priority
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/85 via-primary/70 to-primary/40" />

      <Container className="py-20 sm:py-28">
        <div className="max-w-2xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">
            Inmobiliaria en Buenos Aires
          </p>

          <h1
            id="hero-heading"
            className="font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl"
          >
            {COMPANY_INFO.tagline}
          </h1>

          <p className="max-w-xl text-base text-white/85 sm:text-lg">
            Comprar, vender o alquilar con acompañamiento real, información
            clara y tecnología moderna al servicio de tu operación.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href={ROUTES.gallery}>
                <Search className="h-4 w-4" aria-hidden />
                Ver propiedades
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={ROUTES.quotation}>
                Cotizar mi propiedad
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
