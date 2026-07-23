import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { MOCK_PROPERTIES } from "@/features/properties/mock-data";
import { PropertyGrid } from "@/features/properties/components/PropertyGrid";
import { PropertySearchBar } from "@/features/properties/components/PropertySearchBar";

export const metadata: Metadata = {
  title: "Galería de propiedades",
  description:
    "Explorá departamentos, casas, locales y oficinas en venta y alquiler en Buenos Aires.",
};

export default function GalleryPage() {
  return (
    <section className="py-12 sm:py-16" aria-labelledby="gallery-heading">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Galería"
          title="Nuestras propiedades"
          description="Filtrá por lo que estés buscando o dejate sorprender por nuestras últimas incorporaciones."
        />

        {/* TODO: [SEARCH] — la barra hoy es controlada localmente y no filtra
            el grid. Cuando se implemente la búsqueda inteligente, este
            componente debería (a) llamar a un server action / route handler
            y (b) actualizar `properties` con el resultado. */}
        <PropertySearchBar />

        <PropertyGrid properties={MOCK_PROPERTIES} priorityCount={3} />
      </Container>
    </section>
  );
}
