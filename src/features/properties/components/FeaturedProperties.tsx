import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { PropertyGrid } from "@/features/properties/components/PropertyGrid";
import { getFeaturedProperties } from "@/features/properties/mock-data";
import { ROUTES } from "@/lib/constants";

/**
 * Bloque de "Propiedades destacadas" del Home.
 * Server Component: los datos se leen del mock en tiempo de render.
 */
export function FeaturedProperties() {
  const featured = getFeaturedProperties(4);

  return (
    <section className="py-16 sm:py-20" aria-labelledby="featured-properties-heading">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Propiedades destacadas"
            title="Elegidas por nuestro equipo"
            description="Una selección curada de propiedades que consideramos oportunidades únicas del mercado actual."
          />
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href={ROUTES.gallery}>
              Ver galería completa
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <PropertyGrid properties={featured} priorityCount={2} />
      </Container>
    </section>
  );
}
